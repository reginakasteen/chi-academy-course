import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";


const Navbar = () => {

    const token = useSelector((state: RootState) => state.user.token);

    return (
        <AppBar position="static">
        <Toolbar>
            <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
            >
                My App
            </Typography>

            {token ? (<>
                <Button color="inherit" component={Link} to="/home">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/new-post">
                    New Post
                </Button>
            </>) : (
                <>
                <Button color="inherit" component={Link} to="/login">
                    Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                    Register
                </Button>
                </>
            ) }
            
        </Toolbar>
        </AppBar>
    );
};

export default Navbar;
