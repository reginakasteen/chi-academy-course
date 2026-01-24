import { Drawer, Box, Stack, Button, Divider, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

import ThemeSwitch from './ThemeSwitch';

const drawerWidth: number = 240;

const Sidebar = () => {
    const navigate = useNavigate();

    const handleHeroesClick = () => {
        navigate("/heroes");
    };
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <ThemeSwitch />

                <Divider sx={{ my: 1 }} />
                <Typography variant="h6" sx={{ my: 1 }}>Navigation</Typography>

                <Stack spacing={2}>
                    <Button component={Link} to="/" variant="contained">Home</Button>
                    <Button variant="contained" onClick={handleHeroesClick}>Heroes</Button>
                    <Button component={Link} to="/about" variant="contained">About</Button>
                </Stack>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
