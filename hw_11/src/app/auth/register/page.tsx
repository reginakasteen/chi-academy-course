"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import RegisterForm from "../../../components/RegisterForm";
import { registerUser } from "../../../store/slices/userSlice";
import type { AppDispatch, RootState } from "../../../store/store";
import AuthFormSkeleton from "../../../components/AuthFormSkeleton";

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const loading = useSelector((state: RootState) => state.user.loading);

  const handleRegister = async (data: { username: string; password: string }) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      router.push("/auth/login");
    } catch (err: any) {
      alert(err || "Registration failed");
    }
  };

  if (loading) return <AuthFormSkeleton />;

  return <RegisterForm onSubmit={handleRegister} />;
}
