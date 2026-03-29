import React from 'react';
import { Container, Box, Button, Typography, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import SchoolIcon from '@mui/icons-material/School';

function Login() {
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8081/oauth2/authorization/google';
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" justifyContent="center" 
                 alignItems="center" minHeight="100vh">
                <Paper elevation={3} sx={{ p: 5, textAlign: 'center', 
                                          width: '100%' }}>
                    <SchoolIcon sx={{ fontSize: 60, color: '#1976d2', 
                                     mb: 2 }} />
                    <Typography variant="h4" gutterBottom fontWeight="bold">
                        Smart Campus
                    </Typography>
                    <Typography variant="subtitle1" 
                                color="textSecondary" mb={4}>
                        Operations Hub
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleLogin}
                        sx={{ 
                            backgroundColor: '#DB4437',
                            '&:hover': { backgroundColor: '#C33D2E' },
                            py: 1.5,
                            px: 4,
                            fontSize: '1rem'
                        }}>
                        Sign in with Google
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}

export default Login;