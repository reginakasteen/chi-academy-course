import { useNavigate } from "react-router-dom";
import NewPost from "./NewPost";
import NewPostForm from "../components/NewPostForm";
import { createPost } from "../api/exhibitActions";

const CreatePostPage = () => {
  const navigate = useNavigate();

  const handleCreatePost = async (data: { description: string; image: File | null }) => {
    try {
      await createPost(data);
      navigate("/home"); 
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <NewPost>
      <NewPostForm onSubmit={handleCreatePost} />
    </NewPost>
  );
};

export default CreatePostPage;
