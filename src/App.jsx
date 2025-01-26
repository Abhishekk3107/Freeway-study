import './App.css'
import {  Routes, Route , Navigate  } from 'react-router-dom';
import { Home, Resources, AboutUs, Policy, Admin } from './pages';
import { AdminAuthContext } from './context/AdminAuthContext';
import MainLayout from './layout/MainLayout';
import { useContext } from 'react';
import Main from './AdminPanel/Main';


function App() {
  const {adminUser} = useContext(AdminAuthContext);

  return (
    <>
        <Routes>
          <Route path='/' element={<MainLayout/>} >
            <Route index element={<Home/>}/>
            <Route path='/resources' element={<Resources />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/policy' element={<Policy />} />
          </Route>
          <Route
            path="/admin/dashboard"
            element={adminUser ? <Main/>: <Navigate to="/admin/login" />}
          />
          <Route
            path="/admin/profile"
            element={adminUser ? <>admin profile</>: <Navigate to="/admin/login" />}
          />
          <Route
            path="/admin/login"
            element={
              <Admin />
            }
          />
          <Route path='*' element={<>404 page not page</>}/>
        </Routes>
    </>
  )
}

export default App
