import { Box, CircularProgress, Typography } from '@mui/material'
import Grid2 from '@mui/material/Grid2'

import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { Pagination } from '../../components/Pagination'
import { SearchInput } from '../../components/SearchInput'
import { usePaginatedCharacters } from '../../controllers/usePaginatedCharacters'
import { CharacterItem } from './CharacterItem'


function HomePage() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const page = parseInt(queryParams.get('page')!) || 1
  const nameCharacter = (queryParams.get('name')!) || ''
  const navigate = useNavigate()
  const paginatedCharactersQuery = usePaginatedCharacters(Number(page), nameCharacter, { retry: false, refetchOnMount: true, keepPreviousData: true })

  const {
    control,
    handleSubmit,
    formState,
    watch
  } = useForm<{ search: string }>({
    values: {
      search: nameCharacter
    }
  })



  const search = watch('search')

  const handlePageChange = (page: number) => {
    if (nameCharacter) {
      navigate(`?name=${nameCharacter}&page=${page}`)
    } else {
      navigate(`?page=${page}`)
    }
  }

  const changeNameCharacter = useCallback((value: string) => {
    if (!value) {
      navigate('')
    } else {
      navigate(`?name=${value}`)
    }
  }, [navigate])


  const onSubmit = async (fieldValues: { search: string }) => {
    changeNameCharacter(fieldValues.search)
  }

  useEffect(() => {
    if (formState.submitCount > 0 && search === '') navigate('')
  }, [navigate, search, formState.submitCount])



  const [paginationCount, setPaginationCount] = useState(0)

  useEffect(() => {
    if (paginatedCharactersQuery.data?.info.pages) {
      setPaginationCount(paginatedCharactersQuery.data.info.pages)
    }
  }, [paginatedCharactersQuery.data?.info.pages])

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '3rem', paddingBottom: '3rem', textAlign: 'center' }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Box
          component={'img'}
          alt='Rick y Morty'
          loading='eager'
          src='/title.png'
          sx={{ width: '90%', maxWidth: '500px', boxSizing: 'content-box' }}
        />
        <SearchInput
          control={control}
          label='search'
          name='search'
          disabled={formState.isSubmitting}
          required={true}
        />
      </form>
      {/*<Pagination page={page} setPage={setPage} />*/}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={paginationCount} page={Number(page)} disabled={paginatedCharactersQuery.isNotFound} onPageChange={handlePageChange} />
      </Box>
      {paginatedCharactersQuery.isNotFound && <Typography sx={{ marginTop: '4rem' }} variant='h5' component={'h2'} color='textPrimary'>No se encontro ningun personaje</Typography>}
      {paginatedCharactersQuery.isFetching && !paginatedCharactersQuery.isRefetching && <CircularProgress sx={{ position: 'relative', inset: 'auto', margin: 'auto', marginTop: '4rem' }} size={120} />}
      {paginatedCharactersQuery.data?.results && paginatedCharactersQuery.data?.results?.length > 0 && <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {paginatedCharactersQuery.data?.results.length > 0 && <Grid2
          container
          spacing={{ xs: '1rem', sm: '3rem', md: '4rem' }}
          paddingLeft={'1.5rem'}
          paddingRight={'1.5rem'}
          sx={{
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {paginatedCharactersQuery.data?.results.map((character, index) => (
            <Grid2 key={character.id} >
              <CharacterItem {...character}>{index + 1}</CharacterItem>
            </Grid2>
          ))}
        </Grid2>}
      </Grid2>}
    </Box>
  )
}

export { HomePage }

