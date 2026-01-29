import { Box, Typography } from '@mui/material';
import React from 'react';
import Rick404 from '../img/404_rick.png'; 
import {Button} from '@mui/material';
import { Link } from 'react-router-dom';

const NoPageFound = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center", 
      }}
    >
      <Typography variant="h1" sx={{ mb: 5 }}>
        404
      </Typography>
      <img
        src={Rick404}
        style={{
          width: "20%",
          borderRadius: 8,
        }}
      />

      <Typography variant="h5" sx={{ my: 3 }}>
        There is no page here. Go home.
      </Typography>
      <Button component={Link} to="/" variant="contained">Home</Button>
    </Box>
  );
};

export default NoPageFound;
