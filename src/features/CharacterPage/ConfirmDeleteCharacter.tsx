import { ArrowBack } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, Card, CardContent, Divider, Modal, Typography } from "@mui/material"
import { useDeleteCharacter } from "../../controllers/useDeleteCharacter"
import { Character } from '../../interfaces/Character'

interface IConfirmDeleteCharacter {
    handleClose: () => void
    open: boolean
    character?: Partial<Character>
}

const ConfirmDeleteCharacter = ({ character, handleClose, open }: IConfirmDeleteCharacter) => {
    const deleteCharacter = useDeleteCharacter(character?.id)
    const handleDelete = async () => {
        await deleteCharacter.mutateAsync()
        handleClose()
    }


    return <>
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
                        Eliminar personaje
                    </Typography>
                    <Divider variant="fullWidth" component="div" />
                    <Typography variant='inherit' color='textSecondary'>
                        ¿Estás seguro de que deseas eliminar este personaje?
                        <br />
                        <br />
                        Esta acción es irreversible.
                    </Typography>
                    <Divider variant="fullWidth" component="div" />
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <Button
                            startIcon={<ArrowBack />}
                            variant="outlined"
                            onClick={handleClose}
                        >
                            Volver
                        </Button>
                        <Button
                            onClick={handleDelete}
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            disabled={Boolean(deleteCharacter.data?.deletedAt || deleteCharacter.status === 'pending')}
                            color='error'
                        >
                            Eliminar
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Modal >
    </>
}



export { ConfirmDeleteCharacter }
