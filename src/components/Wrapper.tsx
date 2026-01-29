import { Box } from '@mui/material';
import React, {useState, ReactNode} from 'react';

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({children} : WrapperProps) => {

    return (
        <Box sx={{
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
            {children}
        </Box>

    );
};

export default Wrapper;