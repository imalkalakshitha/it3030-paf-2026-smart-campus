import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    Paper, Chip
} from '@mui/material';
import { ticketAPI } from '../services/api';

function Tickets() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        ticketAPI.getAll().then(res => setTickets(res.data));
    }, []);

    const priorityColor = (priority) => {
        const colors = {
            LOW: 'success', MEDIUM: 'warning',
            HIGH: 'error', CRITICAL: 'error'
        };
        return colors[priority] || 'default';
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Incident Tickets
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#1976d2' }}>
                            <TableCell sx={{ color: 'white' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                Category
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                Description
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                Priority
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.map((t) => (
                            <TableRow key={t.id}>
                                <TableCell>{t.id}</TableCell>
                                <TableCell>{t.category}</TableCell>
                                <TableCell>{t.description}</TableCell>
                                <TableCell>
                                    <Chip label={t.priority}
                                        color={priorityColor(t.priority)}
                                        size="small" />
                                </TableCell>
                                <TableCell>
                                    <Chip label={t.status}
                                        color="primary"
                                        size="small" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Tickets;