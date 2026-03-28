import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <SchoolIcon sx={{ mr: 2 }} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Smart Campus
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/">
                        Dashboard
                    </Button>
                    <Button color="inherit" component={Link} to="/resources">
                        Resources
                    </Button>
                    <Button color="inherit" component={Link} to="/bookings">
                        Bookings
                    </Button>
                    <Button color="inherit" component={Link} to="/tickets">
                        Tickets
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;