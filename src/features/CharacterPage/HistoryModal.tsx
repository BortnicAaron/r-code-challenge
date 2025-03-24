import HistoryIcon from '@mui/icons-material/History'
import { Box, Button, Modal, Typography } from "@mui/material"
import { useState } from "react"
import { Timeline } from './Timeline'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
}

const HistoryModal = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    return <>
        <Button
            onClick={handleOpen}
            endIcon={<HistoryIcon />}
            variant="outlined"
            style={{ display: 'flex' }}
        >Historial</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Historial del personaje
                </Typography>
                <Timeline />
            </Box>
        </Modal>
    </>
}



export { HistoryModal }
