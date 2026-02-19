"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../../components/LoginForm";
import { loginUser } from "../../../store/slices/userSlice";
import type { AppDispatch, RootState } from "../../../store/store";
import AuthFormSkeleton from "../../../components/AuthFormSkeleton";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const loading = useSelector((state: RootState) => state.user.loading);

  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      router.push("/home");
    } catch (err: any) {
      setError(err || "Login failed");
    }
  };

  if (loading) return <AuthFormSkeleton />;

  return <LoginForm onSubmit={handleLogin} error={error} />;
}
