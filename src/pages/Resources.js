import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Button, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    Paper, Chip, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, MenuItem, Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { resourceAPI } from '../services/api';

function Resources() {
    const [resources, setResources] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        name: '', type: 'LAB', capacity: '',
        location: '', status: 'ACTIVE', description: '',
        availableFrom: '08:00:00', availableTo: '18:00:00'
    });

    useEffect(() => { fetchResources(); }, []);

    const fetchResources = async () => {
        const res = await resourceAPI.getAll();
        setResources(res.data);
    };

    const handleSubmit = async () => {
        await resourceAPI.create(form);
        setOpen(false);
        fetchResources();
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Box display="flex" 
                 justifyContent="space-between" 
                 alignItems="center" mb={2}>
                <Typography variant="h4">Resources</Typography>
                <Button variant="contained" 
                        startIcon={<AddIcon />}
                        onClick={() => setOpen(true)}>
                    Add Resource
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#1976d2' }}>
                            <TableCell sx={{ color: 'white' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white' }}>Type</TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                Capacity
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                Location
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {resources.map((r) => (
                            <TableRow key={r.id}>
                                <TableCell>{r.name}</TableCell>
                                <TableCell>{r.type}</TableCell>
                                <TableCell>{r.capacity}</TableCell>
                                <TableCell>{r.location}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={r.status}
                                        color={r.status === 'ACTIVE' 
                                            ? 'success' : 'error'}
                                        size="small"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add Resource Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} 
                    maxWidth="sm" fullWidth>
                <DialogTitle>Add New Resource</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Name" margin="normal"
                        value={form.name}
                        onChange={(e) => 
                            setForm({...form, name: e.target.value})} />
                    <TextField fullWidth select label="Type" margin="normal"
                        value={form.type}
                        onChange={(e) => 
                            setForm({...form, type: e.target.value})}>
                        {['LAB','LECTURE_HALL',
                          'MEETING_ROOM','EQUIPMENT'].map(t => (
                            <MenuItem key={t} value={t}>{t}</MenuItem>
                        ))}
                    </TextField>
                    <TextField fullWidth label="Capacity" 
                        margin="normal" type="number"
                        value={form.capacity}
                        onChange={(e) => 
                            setForm({...form, capacity: e.target.value})} />
                    <TextField fullWidth label="Location" margin="normal"
                        value={form.location}
                        onChange={(e) => 
                            setForm({...form, location: e.target.value})} />
                    <TextField fullWidth label="Description" margin="normal"
                        value={form.description}
                        onChange={(e) => 
                            setForm({...form, 
                                description: e.target.value})} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" 
                            onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default Resources;