import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, 
         IconButton, Badge, Menu, MenuItem, Avatar,
         Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { notificationAPI } from '../services/api';

function Navbar() {
    const navigate = useNavigate();
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifAnchor, setNotifAnchor] = useState(null);

    // URL එකෙන් userId ගන්න
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId') || 
                   localStorage.getItem('userId');
    const userName = urlParams.get('name') || 
                     localStorage.getItem('userName') || 'User';

    useEffect(() => {
        // userId save කරන්න
        if (urlParams.get('userId')) {
            localStorage.setItem('userId', urlParams.get('userId'));
            localStorage.setItem('userName', urlParams.get('name'));
        }
        // Notifications load කරන්න
        if (userId) {
            fetchNotifications();
            // Every 30 seconds refresh
            const interval = setInterval(fetchNotifications, 30000);
            return () => clearInterval(interval);
        }
    }, [userId]);

    const fetchNotifications = async () => {
        try {
            const res = await notificationAPI
                .getUserNotifications(userId);
            setNotifications(res.data);
            const unread = res.data.filter(n => !n.isRead).length;
            setUnreadCount(unread);
        } catch (error) {
            console.error('Notification error:', error);
        }
    };

    const handleNotifOpen = (event) => {
        setNotifAnchor(event.currentTarget);
        // Mark all as read
        if (userId && unreadCount > 0) {
            notificationAPI.markAllAsRead(userId)
                .then(() => {
                    setUnreadCount(0);
                    setNotifications(prev => 
                        prev.map(n => ({...n, isRead: true}))
                    );
                });
        }
    };

    const handleNotifClose = () => setNotifAnchor(null);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        // LocalStorage clear කරන්න
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        // Spring Boot logout
        window.location.href = 
            'http://localhost:8081/logout';
    };

    return (
        <AppBar position="static" elevation={2}>
            <Toolbar>
                <SchoolIcon sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Smart Campus
                </Typography>

                {/* Navigation Buttons */}
                <Box sx={{ display: 'flex', 
                           alignItems: 'center', gap: 1 }}>
                    <Button color="inherit" 
                            component={Link} to="/">
                        Dashboard
                    </Button>
                    <Button color="inherit" 
                            component={Link} to="/resources">
                        Resources
                    </Button>
                    <Button color="inherit" 
                            component={Link} to="/bookings">
                        Bookings
                    </Button>
                    <Button color="inherit" 
                            component={Link} to="/tickets">
                        Tickets
                    </Button>

                    {/* Notification Bell */}
                    <IconButton 
                        color="inherit"
                        onClick={handleNotifOpen}>
                        <Badge badgeContent={unreadCount} 
                               color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    {/* Notification Dropdown */}
                    <Menu
                        anchorEl={notifAnchor}
                        open={Boolean(notifAnchor)}
                        onClose={handleNotifClose}
                        PaperProps={{ 
                            sx: { width: 320, maxHeight: 400 } 
                        }}>
                        <MenuItem disabled>
                            <Typography variant="subtitle2" 
                                        fontWeight="bold">
                                Notifications
                            </Typography>
                        </MenuItem>
                        <Divider />
                        {notifications.length === 0 ? (
                            <MenuItem>
                                <Typography variant="body2" 
                                            color="textSecondary">
                                    No notifications
                                </Typography>
                            </MenuItem>
                        ) : (
                            notifications.slice(0, 10).map(n => (
                                <MenuItem key={n.id} 
                                    sx={{ 
                                        backgroundColor: n.isRead ? 
                                            'inherit' : '#E3F2FD',
                                        whiteSpace: 'normal'
                                    }}>
                                    <Box>
                                        <Typography variant="body2" 
                                                    fontWeight="bold">
                                            {n.title}
                                        </Typography>
                                        <Typography variant="caption" 
                                                    color="textSecondary">
                                            {n.message}
                                        </Typography>
                                    </Box>
                                </MenuItem>
                            ))
                        )}
                    </Menu>

                    {/* User Avatar + Menu */}
                    <IconButton onClick={handleAvatarClick} 
                                sx={{ ml: 1 }}>
                        <Avatar sx={{ 
                            width: 32, height: 32, 
                            bgcolor: '#fff', color: '#1976d2',
                            fontSize: '14px', fontWeight: 'bold'
                        }}>
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}>
                        <MenuItem disabled>
                            <Typography variant="body2">
                                {userName}
                            </Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout}
                            sx={{ color: 'error.main' }}>
                            <LogoutIcon sx={{ mr: 1 }} 
                                        fontSize="small" />
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;