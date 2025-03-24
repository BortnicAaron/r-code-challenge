import EditIcon from '@mui/icons-material/Edit'
import TimelineMUI from '@mui/lab/Timeline'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem'

import TimelineSeparator from '@mui/lab/TimelineSeparator'
import { Box, Button, Typography } from '@mui/material'

import { useState } from 'react'
import { usePaginatedHistory } from '../../controllers/usePaginatedHistory'

const formattedDate = (timestamp: string) => new Date(timestamp).toLocaleDateString('es-ES', {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})

const Timeline = () => {
  const [page, setPage] = useState(1)

  const paginatedHistory = usePaginatedHistory('1', page)

  return (
    <Box display='block' sx={{ 'overflowY': 'scroll' }} height={'20rem'}>


      <TimelineMUI
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >

        {
          paginatedHistory.r?.map((history) => <TimelineItem key={history.id}>
            <TimelineSeparator>
              <TimelineDot >
                <EditIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent >
              <Typography variant="body1" component="div">
                {history.type === 'UPDATE' && 'Actualizacion'}
              </Typography>
              <Typography variant="body2" component="div">
                {formattedDate(history.createdAt)}
              </Typography>

              {history.currentData.name && <Typography variant="body2" component="div">
                - {history.currentData.name && 'Nombre'}
              </Typography>}
              {history.currentData.status && <Typography variant="body2" component="div">
                - {history.currentData.status && 'Estado'}
              </Typography>}
              {history.currentData.type && <Typography variant="body2" component="div">
                - {history.currentData.type && 'Tipo'}
              </Typography>}
              {history.currentData.location && <Typography variant="body2" component="div">
                - {history.currentData.location && 'Locacion'}
              </Typography>}
              {history.currentData.image && <Typography variant="body2" component="div">
                - {history.currentData.image && 'Imagen'}
              </Typography>}
              {history.currentData.species && <Typography variant="body2" component="div">
                - {history.currentData.species && 'Especie'}
              </Typography>}
            </TimelineContent>
          </TimelineItem>)
        }
        <Button
          onClick={() => paginatedHistory.fetchNextPage()}
          disabled={!paginatedHistory.hasNextPage}
        >Next</Button>
      </TimelineMUI>
    </Box>
  )
}

export { Timeline }
