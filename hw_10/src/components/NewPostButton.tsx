import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";

const NewPostButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Button
        color="inherit" 
        onClick={() =>
        navigate("/new-post", {
          state: { backgroundLocation: location },
        })
      }
    >
      New Post
    </Button>
  );
};

export default NewPostButton;
