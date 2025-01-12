import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Figures from "./pages/Figures";
import Places from "./pages/Places";
import Error from "./pages/Error";
import Admin from "./pages/Admin";
import "./App.css"; // Đảm bảo Tailwind được cấu hình trong dự án của bạn
import Games from './pages/Games';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px là ngưỡng cho desktop
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen text-center bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">
          Website này chỉ hoạt động trên máy tính.<br />
          Vui lòng truy cập lại bằng máy tính!
        </h1>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/figures" element={<Figures />} />
        <Route path="/places" element={<Places />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/games" element={<Games />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
