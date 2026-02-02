import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import StripePage from './pages/StripePage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostPage from './pages/PostPage';
import NewPost from './pages/NewPost';
import ModalLayout from './layouts/ModalLayout';
import HomePage from './pages/HomePage';
import { store } from './store/store';
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './layouts/Navbar';

function App() {

  return (
    <Provider store={store} >
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<StripePage />}/>
          <Route element={<PublicRoute/>}>
            <Route path='login' element={<LoginPage/>}/>
            <Route path='register' element={<RegisterPage/>}/>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='post' element={<PostPage/>}/>
            <Route path='home' element={<HomePage/>}/>
            <Route element={<ModalLayout />}>
              <Route path="new-post" element={<NewPost />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
