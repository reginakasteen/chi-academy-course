import RegisterForm from "../components/RegisterForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../store/slices/userSlice";
import type { AppDispatch } from "../store/store";

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRegister = async (data: { username: string; password: string }) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      navigate("/login"); 
    } catch (err: any) {
      console.error(err);
      alert(err || "Registration failed");
    }
  };

  return <RegisterForm onSubmit={handleRegister} />;
};

export default RegisterPage;
