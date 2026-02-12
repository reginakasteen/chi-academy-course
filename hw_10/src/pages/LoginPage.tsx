import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { loginUser } from "../store/slices/userSlice";
import type { AppDispatch } from "../store/store";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate("/home");
    } catch (err: any) {
      setError(err || "Login failed");
    }
  };

  return <LoginForm onSubmit={handleLogin} error={error} />;
};

export default LoginPage;
