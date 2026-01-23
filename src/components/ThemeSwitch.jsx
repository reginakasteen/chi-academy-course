import React from 'react';
import { Box, Switch, Typography } from '@mui/material';
import { useThemeContext } from '../providers/ThemeContextProvider.jsx';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeSwitch = () => {
    const { mode, toggleTheme } = useThemeContext();

    return (
        <Box sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography><LightModeIcon/></Typography>
                <Switch
                    checked={mode === 'dark'}
                    onChange={toggleTheme}
                />
                <Typography><DarkModeIcon/></Typography>
            </Box>
        </Box>
    );
};

export default ThemeSwitch;
