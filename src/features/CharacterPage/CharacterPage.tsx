import { CircularProgress, Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useCharacter } from '../../controllers/useCharacter'
import { CharacterDetails } from './CharacterDetails'

function CharacterPage() {
  let { id } = useParams()
  const character = useCharacter(id ? Number(id) : undefined)

  return (
    <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '3rem', padding: '3rem' }}>
      {character.status === 'pending' && <CircularProgress />}
      {character.data && <CharacterDetails {...character.data} />}
    </Container>
  )
}

export { CharacterPage }
