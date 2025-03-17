import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { CharacterItem } from '../components/CharacterItem'
import { Pagination } from '../components/Pagination'
import { SearchInput } from '../components/SearchInput'
import { Character } from '../interfaces/character'
import { getCharacters } from '../services/character'
import './App.css'


function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isNotFound, setIsNotFound] = useState(false)
  const [characters, setCharacters] = useState<Character[]>([])
  const [page, setPage] = useState(1)
  const [nameCharacter, setNameCharacter] = useState('')

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {

        setCharacters([])
        const paginatedResponse = await getCharacters({ page, name: nameCharacter })
        const characterPaginated = paginatedResponse.data
        setCharacters(characterPaginated.results)
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 404) {
            setIsNotFound(true)
          }
        }
      }
      setIsLoading(false)
    }

    fetchData()


    return () => {
      setIsNotFound(false)
    }
  }, [page, nameCharacter])

  return (
    <div className='App'>
      <SearchInput setValue={setNameCharacter} />
      <Pagination page={page} setPage={setPage} />
      {isNotFound && <h1>No se encontro ningun personaje</h1>}
      {isLoading && <h1>Cargando</h1>}
      {!isNotFound && !isLoading && characters.length > 0 && (
        <div >
          {characters.map((character) => (
            <div key={character.id}>
              <CharacterItem
                {...character}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
