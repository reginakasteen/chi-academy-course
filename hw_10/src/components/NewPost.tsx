import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { PropsWithChildren } from "react";

const NewPost = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); 
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogContent>{children}</DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewPost;
