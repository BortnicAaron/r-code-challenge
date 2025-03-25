import { ArrowBack } from '@mui/icons-material'
import HistoryIcon from '@mui/icons-material/History'
import { Box, Button, Card, CardContent, Divider, Modal, Typography } from "@mui/material"
import { useState } from "react"
import { Timeline } from './Timeline'

interface IHistoryModal {
    disabled?: boolean
    characterId?: number
}

const HistoryModal = ({ disabled, characterId }: IHistoryModal) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    return <>
        <Button
            onClick={handleOpen}
            startIcon={<HistoryIcon />}
            variant="outlined"
            style={{ display: 'flex' }}
            disabled={disabled}
        >Historial</Button>
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                flexWrap: 'wrap'
            }}
        >
            <Card sx={{ width: { xs: "100%", sm: '24rem' } }}  >
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: '1.5rem', alignItems: 'stretch', m: '1rem' }} >
                    <Typography variant="h5" component={'h4'} color={false ? 'textDisabled' : 'textPrimary'}>
                        Historial
                    </Typography>
                    <Divider variant="fullWidth" component="div" />
                    <Timeline characterId={characterId} />
                    <Divider variant="fullWidth" component="div" />
                    <Box>
                        <Button
                            startIcon={<ArrowBack />}
                            variant="outlined"
                            onClick={handleClose}
                        >
                            Volver
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Modal >
    </>
}



export { HistoryModal }
