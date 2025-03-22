import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import { useMemo } from "react"
import { Link } from 'react-router-dom'
import { Character } from "../../interfaces/Character"

function getEpisodeNumberFromUrl(url: string) {
    const episodeNumber = url.split('/').pop() // Extrae el número del episodio de la URL
    return episodeNumber
}


const formatterList = (items: string[]) => new Intl.ListFormat("es", { style: "long", type: "conjunction" }).format(items)


const CharacterDetails = (character: Partial<Character>) => {
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

    return <Card sx={{ maxWidth: '20rem' }} >
        <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center" gap='1rem'>
                <img src={character.image} alt={character.name} style={{ width: '100%', borderRadius: '50%' }} />
                <div style={{ display: 'flex', gap: '3rem' }}>
                    <Button
                        component={Link}
                        to={`edit`}
                        variant="outlined"
                        endIcon={<EditIcon />}
                    >
                        Editar
                    </Button>
                    <Button variant="outlined" endIcon={<DeleteIcon />}>
                        Eliminar
                    </Button>
                </div>
                <Typography variant="h5" component="div" gutterBottom>
                    {character.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Estado: {character.status}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Expecie: {character.species}
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
