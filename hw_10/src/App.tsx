import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import StripePage from "./pages/StripePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostPage from "./pages/PostPage";
import CreatePostPage from "./pages/CreatePostPage";
import HomePage from "./pages/HomePage";
import Navbar from "./layouts/Navbar";
import ModalLayout from "./layouts/ModalLayout";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotificationProvider from "./providers/NotificationProvider";
import { store } from "./store/store";

interface LocationState {
  backgroundLocation?: Location;
}

function AppRoutes() {
  const location = useLocation();
  const state = location.state as LocationState | null;

  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route index element={<StripePage />} />
        <Route path="post/:id" element={<PostPage />} />

        <Route element={<PublicRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="home" element={<HomePage />} />
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path="new-post"
            element={
              <ModalLayout>
                <CreatePostPage />
              </ModalLayout>
            }
          />
        </Routes>
      )}
    </>
  );
}


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NotificationProvider>
          <Navbar />
          <AppRoutes />
        </NotificationProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
