import { createContext, useContext, useMemo, useState } from 'react';
import React, {ReactNode} from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeContextProviderProps, ThemeMode, ThemeContextType } from '../types/theme';


const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeContextProvider = ({children} : ThemeContextProviderProps) => {
    const [mode, setMode] = useState<ThemeMode>('light');

    const toggleTheme = () => {
        setMode(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'dark' && {
                        background: {
                            default: '#121212',
                            paper: '#1e1e1e',
                        },
                    }),
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used inside ThemeContextProvider');
    }
    return context;
};

