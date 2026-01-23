import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.jsx';
import './styles/styles.css';
import {ThemeContextProvider} from './providers/ThemeContextProvider.jsx';


const root = createRoot(document.getElementById('root'));
root.render(
    <ThemeContextProvider>
        <App />
    </ThemeContextProvider>
);