import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import { AdminAuthContext } from "./context/AdminAuthContext";
import MainLayout from "./layout/MainLayout";
import Main from "./AdminPanel/Main";

// Lazy loading for better performance
const Home = lazy(() => import("./pages/Home"));
const Resources = lazy(() => import("./pages/Resources"));
const AboutUs = lazy(() => import("./pages/About"));
const Policy = lazy(() => import("./pages/Policy"));
const Admin = lazy(() => import("./pages/Admin"));
const SemesterSelection = lazy(() => import("./pages/SemesterSelection"));
const SubjectSelection = lazy(() => import("./pages/SubjectSelection"));
const PDFViewer = lazy(() => import("./pages/PDFViewer"));
// const Profile = lazy(() => import("./AdminPanel/Sections/Profile"));

function App() {
  const { adminUser } = useContext(AdminAuthContext);

  const [darkMode, setDarkMode] = React.useState(false)
    
        React.useEffect(() => {
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
            const savedTheme = localStorage.getItem('theme')
    
            if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
                setDarkMode(true)
                document.documentElement.classList.add('dark')
            }
        }, [])
    
        React.useEffect(() => {
            if (darkMode) {
                document.documentElement.classList.add('dark')
                localStorage.setItem('theme', 'dark')
            } else {
                document.documentElement.classList.remove('dark')
                localStorage.setItem('theme', 'light')
            }
        }, [darkMode])

  return (
    <Suspense fallback={<div className={`w-full h-screen ${darkMode ? "bg-slate-900":"bg-white"} flex justify-center items-center text-gray-400`}>
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-gray-600 w-12 h-12"></div>
    </div>}>
      <Routes>
        {/* Main Layout with Nested Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="resources" element={<Resources />} />

          {/* Dynamic Resource Routes */}          
          <Route path="resources/:course" element={<SemesterSelection />} />
          <Route path="resources/:course/:semester" element={<SubjectSelection />} />
          <Route path="resources/:course/:semester/:subject" element={<PDFViewer />} />
          <Route path="resources/:course/:semester/:subject/:resourceType" element={< >resouces type</>} />

          {/* Static Pages */}
          <Route path="about" element={<AboutUs />} />
          <Route path="policy" element={<Policy />} />

          {/* Catch-All for Unmatched Routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>

        {/* Admin Panel with Authentication Check */}
        <Route path="admin">
          <Route path="dashboard" element={adminUser ? <Main /> : <Navigate to="/admin/login" />} />
          {/* <Route path="profile" element={adminUser ? <Profile/> : <Navigate to="/admin/login" />} /> */}
          <Route path="login" element={<Admin />} />
        </Route>

        {/* Global Catch-All */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
