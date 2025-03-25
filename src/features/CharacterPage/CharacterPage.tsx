import { CircularProgress, Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useCharacter } from '../../controllers/useCharacter'
import { CharacterComments } from './CharacterComments'
import { CharacterDetails } from './CharacterDetails'

function CharacterPage() {
  let { id } = useParams()
  const character = useCharacter(id ? Number(id) : undefined)

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', px: '1rem', gap: '3rem' }}>
      {character.status === 'pending' && <CircularProgress />}
      {character.data && <CharacterDetails {...character.data} />}
      {character.data && <CharacterComments {...character.data} />}
    </Container>
  )
}

export { CharacterPage }
