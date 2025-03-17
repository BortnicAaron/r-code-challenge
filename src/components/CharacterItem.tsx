import { useNavigate } from "react-router-dom"
import { Character as CharacterType } from "../interfaces/character"
import styles from './CharacterItem.module.css'

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


export { CharacterItem }
