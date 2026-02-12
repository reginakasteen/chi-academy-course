import RegisterForm from "../components/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../store/slices/userSlice";
import type { AppDispatch } from "../store/store";
import AuthFormSkeleton from "../components/AuthFormSkeleton";
import type { RootState } from "../store/store";

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loading = useSelector((state: RootState) => state.user.loading);

  const handleRegister = async (data: { username: string; password: string }) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      navigate("/login");
    } catch (err: any) {
      alert(err || "Registration failed");
    }
  };

  if (loading) {
    return <AuthFormSkeleton />;
  }

  return <RegisterForm onSubmit={handleRegister} />;
};

export default RegisterPage;
