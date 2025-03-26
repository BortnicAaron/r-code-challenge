import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Divider, Modal, Typography } from "@mui/material"
import { Character } from '../../interfaces/Character'
import { Timeline } from './Timeline'

interface IHistories {
    handleClose: () => void
    open: boolean
    character?: Partial<Character>
}

const Histories = ({ character, open, handleClose }: IHistories) => {
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
                        Historial
                    </Typography>
                    <Divider variant="fullWidth" component="div" />
                    <Timeline characterId={character?.id} />
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



export { Histories }
