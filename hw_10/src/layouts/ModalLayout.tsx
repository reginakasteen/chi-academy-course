import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { PropsWithChildren } from "react";

const ModalLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  return (
    <Dialog open onClose={() => navigate(-1)} maxWidth="sm" fullWidth>
      <DialogContent>{children}</DialogContent>

      <DialogActions>
        <Button onClick={() => navigate(-1)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalLayout;
