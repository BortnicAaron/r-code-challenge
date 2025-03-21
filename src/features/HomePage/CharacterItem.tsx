import { Character as ICharacter } from "../../interfaces/Character"


import Button from "@mui/material/Button"
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import styles from './CharacterItem.module.css'

/*
function CharacterItem(character: CharacterType) {
    let navigate = useNavigate()
    return (
        <div className={styles.characterItem}>
            <h3>{character.name}</h3>
            <h4>{character.species}</h4>
            <img src={character.image} alt={character.name} />
            <button
                onClick={() => navigate(`/${character.id}`)}
            >Ver mas</button>
        </div>
    )
}
*/
const CharacterItem = (character: ICharacter) => {

    return (
        <Card sx={{ maxWidth: 345 }} className={styles.characterItem}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={character.image}
                    height={300}
                    alt="green iguana"
                />
                <CardContent style={{ height: 'max-content' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {character.name}
                    </Typography>
                    {character.species && <Typography gutterBottom variant="h6" component="div">
                        {character.species}
                    </Typography>}
                    <Button style={{ height: '100%' }}>
                        Ver mas
                    </Button>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}



export { CharacterItem }
