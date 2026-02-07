import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { clearUser } from "../store/slices/userSlice";

const Navbar = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());  
    navigate("/");        
  };

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

        {token ? (
          <>
            <Button color="inherit" component={Link} to="/home">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/new-post">
              New Post
            </Button>
            <Button color="inherit" onClick={handleLogout}  component={Link} to="/">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
