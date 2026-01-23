import React, {useState} from 'react';

import { Box } from '@mui/material';
import Sidebar from './Sidebar.jsx';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

const Layout = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />

            <Box
                component="index"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    ml: `${drawerWidth}px`,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;
