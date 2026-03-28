import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    Paper, Chip, Button, Box
} from '@mui/material';
import { bookingAPI } from '../services/api';

function Bookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => { fetchBookings(); }, []);

    const fetchBookings = async () => {
        const res = await bookingAPI.getAll();
        setBookings(res.data);
    };

    const handleApprove = async (id) => {
        await bookingAPI.approve(id, 'Approved');
        fetchBookings();
    };

    const handleReject = async (id) => {
        await bookingAPI.reject(id, 'Rejected');
        fetchBookings();
    };

    const statusColor = (status) => {
        const colors = {
            PENDING: 'warning', APPROVED: 'success',
            REJECTED: 'error', CANCELLED: 'default'
        };
        return colors[status] || 'default';
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Bookings</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#1976d2' }}>
                            <TableCell sx={{ color: 'white' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                Resource
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>Date</TableCell>
                            <TableCell sx={{ color: 'white' }}>Time</TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                Purpose
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>Status</TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map((b) => (
                            <TableRow key={b.id}>
                                <TableCell>{b.id}</TableCell>
                                <TableCell>
                                    {b.resource?.name}
                                </TableCell>
                                <TableCell>{b.bookingDate}</TableCell>
                                <TableCell>
                                    {b.startTime} - {b.endTime}
                                </TableCell>
                                <TableCell>{b.purpose}</TableCell>
                                <TableCell>
                                    <Chip label={b.status}
                                        color={statusColor(b.status)}
                                        size="small" />
                                </TableCell>
                                <TableCell>
                                    {b.status === 'PENDING' && (
                                        <Box display="flex" gap={1}>
                                            <Button size="small"
                                                variant="contained"
                                                color="success"
                                                onClick={() => 
                                                    handleApprove(b.id)}>
                                                Approve
                                            </Button>
                                            <Button size="small"
                                                variant="contained"
                                                color="error"
                                                onClick={() => 
                                                    handleReject(b.id)}>
                                                Reject
                                            </Button>
                                        </Box>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Bookings;