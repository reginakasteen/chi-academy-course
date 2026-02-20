"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { clearUser } from "../store/slices/userSlice";
import NewPostButton from "../components/NewPostButton";

export default function Navbar() {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearUser());
    router.push("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}>
          <Typography variant="h6">My App</Typography>
        </Link>

        {token ? (
          <>
            <NewPostButton />
            <Button color="inherit" onClick={() => router.push("/home")}>
              Home
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => router.push("/auth/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => router.push("/auth/register")}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}