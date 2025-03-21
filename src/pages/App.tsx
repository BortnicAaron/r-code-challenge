import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CharacterItem } from '../components/CharacterItem'
import { Pagination } from '../components/Pagination'
import { SearchInput } from '../components/SearchInput'
import { usePaginatedCharacters } from '../controllers/usePaginatedCharacters'
import './App.css'


function App() {

  const [page, setPage] = useState(1)
  const [nameCharacter, setNameCharacter] = useState('')

  const paginatedCharactersQuery = usePaginatedCharacters(page, nameCharacter, { retry: false, refetchOnMount: false, keepPreviousData: true })


  const {
    control,
    handleSubmit,
    formState
  } = useForm<{ search: string }>()

  const onSubmit = async (fieldValues: { search: string }) => {
    setNameCharacter(fieldValues.search)
  }


  return (
    <div className='App'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchInput
          control={control}
          label='search'
          name='search'
          disabled={formState.isSubmitting}
          required={true}
        />
      </form>
      <Pagination page={page} setPage={setPage} />
      {false && <h1>No se encontro ningun personaje</h1>}
      {paginatedCharactersQuery.isFetching && <h1>Cargando</h1>}
      {!paginatedCharactersQuery.isFetching && paginatedCharactersQuery.data?.data?.results && paginatedCharactersQuery.data?.data?.results?.length > 0 && (
        <div >
          {paginatedCharactersQuery.data?.data?.results.map((character) => (
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
