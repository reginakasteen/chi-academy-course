import NewPost from "../pages/CreatePostPage";
import { Outlet, useLocation } from "react-router-dom";

const ModalLayout = () => {
  const { state } = useLocation();

  return state?.backgroundLocation ? (
    <NewPost>
      <Outlet />
    </NewPost>
  ) : (
    <Outlet />
  );
};

export default ModalLayout;