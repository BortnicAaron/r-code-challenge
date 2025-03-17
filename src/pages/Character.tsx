import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CharacterDetails } from '../components/CharacterDetails'
import { Character as CharacterType } from '../interfaces/character'
import { getCharacter } from '../services/character'
import './App.css'

function Character() {
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
    <>
      <h1>
        Character Page
      </h1>
      {loading ? (
        <div>Loading</div>
      ) : (
        <CharacterDetails {...character} />
      )}
    </>
  )
}

export default Character
