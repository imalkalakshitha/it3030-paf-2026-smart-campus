import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, 
         Typography, Box } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import BugReportIcon from '@mui/icons-material/BugReport';
import { resourceAPI, bookingAPI, ticketAPI } from '../services/api';

function Dashboard() {
    const [stats, setStats] = useState({
        resources: 0, bookings: 0, tickets: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [res, book, tick] = await Promise.all([
                    resourceAPI.getAll(),
                    bookingAPI.getAll(),
                    ticketAPI.getAll(),
                ]);
                setStats({
                    resources: res.data.length,
                    bookings: book.data.length,
                    tickets: tick.data.length,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { title: 'Total Resources', value: stats.resources, 
          icon: <MeetingRoomIcon fontSize="large" />, color: '#1976d2' },
        { title: 'Total Bookings', value: stats.bookings, 
          icon: <BookOnlineIcon fontSize="large" />, color: '#388e3c' },
        { title: 'Total Tickets', value: stats.tickets, 
          icon: <BugReportIcon fontSize="large" />, color: '#d32f2f' },
    ];

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                {cards.map((card, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Card elevation={3}>
                            <CardContent>
                                <Box display="flex" 
                                     justifyContent="space-between"
                                     alignItems="center">
                                    <Box>
                                        <Typography 
                                            color="textSecondary" 
                                            gutterBottom>
                                            {card.title}
                                        </Typography>
                                        <Typography variant="h3">
                                            {card.value}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ color: card.color }}>
                                        {card.icon}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Dashboard;