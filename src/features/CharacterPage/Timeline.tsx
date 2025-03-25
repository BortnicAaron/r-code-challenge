import EditIcon from '@mui/icons-material/Edit'
import TimelineMUI from '@mui/lab/Timeline'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import { Box, Button, Typography } from '@mui/material'
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
                  value={history.currentData.name}
                  label='Nombre'
                />
                <HistoryItem
                  value={history.currentData.status}
                  label='Estado'
                />
                <HistoryItem
                  value={history.currentData.type}
                  label='Tipo'
                />
                <HistoryItem
                  value={history.currentData.location}
                  label='Locacion'
                />
                <HistoryItem
                  value={history.currentData.image}
                  label='Imagen'
                />
                <HistoryItem
                  value={history.currentData.species}
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
  value?: unknown
  label: string
}

const HistoryItem = ({
  value,
  label
}: IHistoryItem) => {
  return <>{Boolean(value) && <Typography variant="body2" component="div">
    - {label}
  </Typography>}
  </>
}

export { Timeline }
