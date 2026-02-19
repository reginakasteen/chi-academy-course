"use client";

import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";

export default function ModalLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <Dialog open onClose={() => router.back()} fullWidth maxWidth="sm">
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => router.back()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
