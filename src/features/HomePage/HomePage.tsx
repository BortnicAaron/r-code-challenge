import { Typography } from '@mui/material'
import Grid2 from '@mui/material/Grid2'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pagination } from '../../components/Pagination'
import { SearchInput } from '../../components/SearchInput'
import { usePaginatedCharacters } from '../../controllers/usePaginatedCharacters'
import { CharacterItem } from './CharacterItem'


function HomePage() {
  const [nameCharacter, setNameCharacter] = useState('')
  const [page, setPage] = useState(1)

  const paginatedCharactersQuery = usePaginatedCharacters(page, nameCharacter, { retry: false, refetchOnMount: false, keepPreviousData: true })

  const {
    control,
    handleSubmit,
    formState,
    watch
  } = useForm<{ search: string }>()
  const search = watch('search')


  const changeNameCharacter = (value: string) => {
    setPage(1)
    setNameCharacter(value)
  }


  const onSubmit = async (fieldValues: { search: string }) => {
    changeNameCharacter(fieldValues.search)
  }

  useEffect(() => {
    if (search === '') changeNameCharacter(search)
  }, [search])



  const [paginationCount, setPaginationCount] = useState(0)

  useEffect(() => {
    if (paginatedCharactersQuery.data?.data.info.pages) {
      setPaginationCount(paginatedCharactersQuery.data?.data.info.pages)
    }
  }, [paginatedCharactersQuery.data?.data.info.pages])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', paddingTop: '3rem', paddingBottom: '3rem', textAlign: 'center' }}>
      <Typography component={'h1'} variant='h1' >
        Rick and Morty
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', justifyContent: 'center' }}>
        <SearchInput
          control={control}
          label='search'
          name='search'
          disabled={formState.isSubmitting}
          required={true}
        />
      </form>
      {/*<Pagination page={page} setPage={setPage} />*/}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={paginationCount} page={page} disabled={paginatedCharactersQuery.isNotFound} onPageChange={setPage} />
      </div>
      {paginatedCharactersQuery.isNotFound && <h1>No se encontro ningun personaje</h1>}
      {paginatedCharactersQuery.isFetching && !paginatedCharactersQuery.isRefetching && <h1>Cargando</h1>}
      {paginatedCharactersQuery.data?.data?.results && paginatedCharactersQuery.data?.data?.results?.length > 0 && <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {paginatedCharactersQuery.data?.data?.results.map((character, index) => (
          <Grid2 container key={character.id} size={{ xs: 2, sm: 4, md: 4 }} >
            <CharacterItem {...character}>{index + 1}</CharacterItem>
          </Grid2>
        ))}
      </Grid2>}
    </div>
  )
}

export { HomePage }

