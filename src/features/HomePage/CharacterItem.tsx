import { Character as ICharacter } from "../../interfaces/Character"


import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Link } from "react-router-dom"
import styles from './CharacterItem.module.css'

const CharacterItem = (character: ICharacter) => {
    const isDeleted = Boolean(character.deletedAt)
    return (
        <Card
            component={Link}
            to={`/${character.id}`}
            sx={{ maxWidth: 345 }} className={styles.characterItem}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={character.image}
                    height={300}
                    alt="character"
                    style={isDeleted ? {
                        filter: 'grayscale(100%)',
                    } : undefined}
                />
                <CardContent style={{ height: 'max-content' }}>
                    {isDeleted && <Typography
                        style={{
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
                    <Typography gutterBottom variant="h5" component="div">
                        {character.name}
                    </Typography>
                    {character.species && <Typography gutterBottom variant="h6" component="div">
                        {character.species}
                    </Typography>}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}



export { CharacterItem }
