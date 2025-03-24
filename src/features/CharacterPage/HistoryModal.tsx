import HistoryIcon from '@mui/icons-material/History'
import { Box, Button, Modal, Typography } from "@mui/material"
import { useState } from "react"
import { Timeline } from './Timeline'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '400px',
    width: '100%',
    boxSizing: 'border-box',
    bgcolor: 'background.paper',
    color: 'text.primary',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
}


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
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Historial del personaje:
                </Typography>
                <Timeline characterId={characterId} />
            </Box>
        </Modal>
    </>
}



export { HistoryModal }
