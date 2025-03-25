import { Character as ICharacter } from "../../interfaces/Character"


import HideImageIcon from '@mui/icons-material/HideImageOutlined'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const CharacterItem = (character: ICharacter) => {
    const isDeleted = Boolean(character.deletedAt)
    const imgRef = useRef<HTMLImageElement>(null)
    const navigate = useNavigate()


    const [error, setError] = useState(false)
    const onError = () => {
        if (imgRef.current) imgRef.current.style.opacity = '0'
        setError(true)
    }

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                margin: 'auto',
                height: '100%',
                textDecoration: "none",
                width: { xs: '300px', md: '300px' },
            }}
        >
            <CardActionArea
                onClick={() => {
                    navigate(`/${character.id}`)
                }}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    height: '100%'
                }}
            >
                {!error ? <CardMedia
                    component="img"
                    loading="lazy"
                    image={character.image}
                    ref={imgRef}
                    height={300}
                    width={300}
                    sx={{ height: { sm: '435px', md: '300px' } }}
                    alt={character.name}
                    onError={onError}
                    style={isDeleted ? {
                        filter: 'grayscale(100%)',
                    } : undefined}
                /> : <CardMedia
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 300, height: { sm: '435px', md: '300px' } }}
                >
                    <HideImageIcon sx={{ width: '40%', height: '40%', opacity: 0.5 }} />
                </CardMedia>}
                <CardContent sx={{ height: 'max-content' }}>
                    {isDeleted && <Typography
                        sx={{
                            position: 'absolute',
                            top: '150px',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                        variant="h4"
                        component="div"
                        gutterBottom
                        color='error'

                    >ELIMINADO</Typography>}
                    <Typography gutterBottom variant="h5" component="div" sx={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                        {character.name}
                    </Typography>
                    {character.species && <Typography gutterBottom variant="h6" component="div" color="textSecondary" sx={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                        {character.species}
                    </Typography>}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}



export { CharacterItem }
