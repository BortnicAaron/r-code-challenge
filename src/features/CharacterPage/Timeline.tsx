import EditIcon from '@mui/icons-material/Edit'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import TimelineMUI from '@mui/lab/Timeline'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import { Box, Button, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import { useId, useState } from 'react'
import { usePaginatedHistory } from '../../controllers/usePaginatedHistory'

const formattedDate = (timestamp: string) => new Date(timestamp).toLocaleDateString('es-ES', {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})

interface ITimeLine {
  characterId?: number
}

const Timeline = ({ characterId }: ITimeLine) => {

  const paginatedHistory = usePaginatedHistory(characterId)


  if (paginatedHistory.status === 'success' && paginatedHistory.r?.length === 0) {
    return <Typography variant="h6" component="div" sx={{ textAlign: 'center' }} marginBottom={'5rem'} marginTop={'5rem'} color=''>
      No hay registro de cambios
    </Typography>
  }

  return (
    <Box display='block' sx={{ 'overflowY': 'scroll' }} height={'20rem'}>
      <TimelineMUI
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
          my: 0,
          py: 0,
          pl: 0,
          ml: 0
        }}
      >

        {
          paginatedHistory.r?.map((history, index) => <TimelineItem key={history.id}>
            <TimelineSeparator>
              <TimelineDot >
                <EditIcon />
              </TimelineDot>
              {index !== paginatedHistory.r?.length! - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent >
              <Typography variant="body1" component="div">
                {history.type === 'UPDATE' && 'Actualizacion'}
              </Typography>
              <Typography variant="body2" component="div">
                {formattedDate(history.createdAt)}
              </Typography>
              <Box display={'flex'} flexDirection='column' gap={'0.5rem'} marginTop={'0.5rem'} marginBottom={'0.5rem'}>
                <HistoryItem
                  newValue={history.currentData.name}
                  oldValue={history.previousData.name}
                  label='Nombre'
                />
                <HistoryItem
                  newValue={history.currentData.status}
                  oldValue={history.previousData.status}
                  label='Estado'
                />
                <HistoryItem
                  newValue={history.currentData.type}
                  oldValue={history.previousData.type}
                  label='Tipo'
                />
                <HistoryItem
                  newValue={history.currentData.location?.name}
                  oldValue={history.previousData.location?.name}
                  label='Locacion'
                />
                <HistoryItem
                  newValue={history.currentData.image}
                  oldValue={history.previousData.image}
                  label='Imagen'
                />
                <HistoryItem
                  newValue={history.currentData.species}
                  oldValue={history.previousData.species}
                  label='Especie'
                />
              </Box>

            </TimelineContent>
          </TimelineItem>)
        }
        <Button
          onClick={() => paginatedHistory.fetchNextPage()}
          disabled={!paginatedHistory.hasNextPage}
        >Ver más</Button>
      </TimelineMUI>
    </Box>
  )
}

interface IHistoryItem {
  newValue?: string
  oldValue?: string
  label: string
}

const HistoryItem = ({
  newValue,
  oldValue,
  label
}: IHistoryItem) => {
  const ID = useId()
  const [open, setOpen] = useState(false)
  return <>{typeof (newValue) === 'string' && <>
    <Box display={'flex'} alignContent='center' alignItems='center' sx={{ cursor: 'pointer' }}>
      <Typography variant="body2" component="label" htmlFor={ID} sx={{ cursor: 'inherit' }}>
        {label}
      </Typography>
      <IconButton onClick={() => setOpen(!open)} size='small' sx={{ display: 'flex', alignItems: 'center' }} id={ID}>
        <KeyboardArrowDownOutlinedIcon sx={{
          fontSize: '1rem',
          transform: open ? "rotate(-180deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
        }} />
      </IconButton>
    </Box>
    {open && <>
      <Typography variant="caption" component="p" sx={{ bgcolor: red['700'], p: '0.25rem 0.5rem', overflowWrap: 'break-word', wordBreak: 'break-word', }}>
        "{oldValue}"
      </Typography>
      <Typography variant="caption" component="p" sx={{ bgcolor: green['700'], p: '0.25rem 0.5rem', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
        "{newValue}"
      </Typography>
    </>}
  </>}

  </>
}

export { Timeline }
