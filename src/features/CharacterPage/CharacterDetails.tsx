import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import HideImageIcon from '@mui/icons-material/HideImageOutlined'
import { Avatar, Box, Button, Card, CardContent, Typography } from "@mui/material"
import { useMemo, useState } from "react"
import { Link } from 'react-router-dom'
import { Character } from "../../interfaces/Character"
import { ConfirmDeleteCharacter } from './ConfirmDeleteCharacter'
import { HistoryModal } from './HistoryModal'

function getEpisodeNumberFromUrl(url: string) {
    const episodeNumber = url.split('/').pop()
    return episodeNumber
}


const formatterList = (items: string[]) => new Intl.ListFormat("es", { style: "long", type: "conjunction" }).format(items)


const CharacterDetails = (character: Partial<Character>) => {
    const [openConfirmDeleteCharacter, setOpenConfirmDeleteCharacter] = useState(false)

    const episodesText = useMemo(() => {
        const episodes = character.episode
        if (!episodes) return undefined

        const numberOfEpisodes: string[] = []

        for (const episode of episodes) {
            const p = getEpisodeNumberFromUrl(episode)
            if (p) numberOfEpisodes.push(p)
        }
        return numberOfEpisodes.length > 0 ? formatterList(numberOfEpisodes) : undefined
    }, [character.episode])



    const isDeleted = Boolean(character.deletedAt)

    return <Card sx={{ width: { xs: "100%", sm: '24rem' } }}  >
        <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", gap: '1rem', m: '1rem', textAlign: 'start', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                <Box sx={{ width: "100%", position: "relative" }}>
                    {/* Contenedor para mantener el aspect ratio 1:1 */}
                    <Box sx={{ width: "100%", paddingTop: "100%", }} />

                    <Avatar
                        src={character.image}
                        variant="circular"
                        alt={character.name}
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",

                        }}
                    >
                        <HideImageIcon sx={{ width: '40%', height: '40%', margin: '5000rem' }} />
                    </Avatar>
                </Box>
                <Box display={'flex'} flexDirection={'column'} justifyContent='space-between' gap={'1rem'} width={'100%'}>
                    <Button
                        component={Link}
                        to={`edit`}
                        variant="outlined"
                        startIcon={<EditIcon />}
                        disabled={isDeleted}
                    >
                        Editar
                    </Button>
                    <Button
                        onClick={() => setOpenConfirmDeleteCharacter(true)}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        disabled={isDeleted}
                    >
                        Eliminar
                    </Button>
                    <ConfirmDeleteCharacter
                        handleClose={() => setOpenConfirmDeleteCharacter(false)}
                        open={openConfirmDeleteCharacter}
                        character={character}
                    />
                    <HistoryModal disabled={isDeleted} characterId={character?.id} />
                </Box>
                <Typography variant="h5" component="div" gutterBottom>
                    {character.name}
                </Typography>
                {isDeleted && <Typography variant="h5" component="div" gutterBottom color='error'>
                    ELIMINADO
                </Typography>}
                <Typography variant="body1" color="textSecondary">
                    Estado: {character.status}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Especie: {character.species}
                </Typography>
                {character.type && <Typography variant="body1" color="textSecondary">
                    Tipo: {character.type}
                </Typography>}
                {character.location?.name && <Typography variant="body1" color="textSecondary">
                    Última ubicación: {character.location?.name}
                </Typography>}
                <Typography variant="body1" color="textSecondary">
                    Episodios: {episodesText || 'No episodes found.'}
                </Typography>
            </Box>
        </CardContent>
    </Card>
}


export { CharacterDetails }
