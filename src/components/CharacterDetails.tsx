import { Character } from "../interfaces/character"




const CharacterDetails = (character: Partial<Character>) => {
    return <div >
        <h3>{character.name}</h3>
        {character.species && <h4>{character.species}</h4>}
        {character.status && <h5>{character.status}</h5>}
        {character.image && <img src={character.image} alt={character.name} />}
    </div>
}


export { CharacterDetails }
