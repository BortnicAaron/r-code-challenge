import { Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Outlet, useNavigate } from 'react-router-dom'
import { HomeIcon } from './HomeIcon'


function RootPage() {
    const navigate = useNavigate()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar sx={{ py: '0.25rem' }}>
                    <Box
                        component={Button}
                        color={'inherit'}
                        textTransform={'none'}
                        sx={{ display: 'flex', gap: '0.5rem' }}
                        onClick={() => navigate('', { replace: true })}

                    >
                        <HomeIcon />
                        <Typography variant="h6" component="div">
                            Inicio
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Outlet />
        </Box>
    )
}



export { RootPage }
