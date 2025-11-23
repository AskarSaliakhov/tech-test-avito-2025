import { AppBar, Toolbar, Button, Container, Typography, Box } from '@mui/material';
import { Link, useLocation, Outlet } from 'react-router-dom';

export function Navbar() {
    const location = useLocation();

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/"
                            sx={{
                                mr: 4,
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                                flexGrow: { xs: 1, md: 0 }
                            }}
                        >
                            MyApp
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                            <Button
                                component={Link}
                                to="/ads"
                                variant={location.pathname === '/' || location.pathname === '/ads' ? "outlined" : "text"}
                                sx={{
                                    color: 'white',
                                    borderColor: 'white',
                                    '&:hover': {
                                        borderColor: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                    }
                                }}
                            >
                                Объявления
                            </Button>

                            <Button
                                component={Link}
                                to="/stats"
                                variant={location.pathname === '/stats' ? "outlined" : "text"}
                                sx={{
                                    color: 'white',
                                    borderColor: 'white',
                                    '&:hover': {
                                        borderColor: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                    }
                                }}
                            >
                                Статистика
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </>
    );
}
