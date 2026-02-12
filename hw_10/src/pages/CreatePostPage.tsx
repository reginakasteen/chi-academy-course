import NewPostForm from "../components/NewPostForm";
import { createPost } from "../api/exhibitActions";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    await createPost(data);
    navigate(-1);
  };

  return <NewPostForm onSubmit={handleSubmit} />;
};

export default CreatePostPage;
