import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Character as CharacterType } from '../../interfaces/Character'
import { getCharacter } from '../../services/character'
import { CharacterDetails } from './CharacterDetails'

function CharacterPage() {
  const [loading, setLoading] = useState(true)
  const [character, setCharacter] = useState<CharacterType | undefined>()
  let { id } = useParams()

  useEffect(() => {
    async function fetchData() {
      try {
        const paginatedResponse = await getCharacter(Number(id))
        const characterPaginated = paginatedResponse.data
        setCharacter(characterPaginated)
        setLoading(false)
      } catch (error) {

      }
    }
    fetchData()
  }, [id])

  return (
    <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '3rem', padding: '3rem' }}>
      {loading ? (
        <div>Loading</div>
      ) : (
        <CharacterDetails {...character} />
      )}
    </Container>
  )
}

export { CharacterPage }
