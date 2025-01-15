import React from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive"; // Import hook
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Figures from "./pages/Figures";
import Places from "./pages/Places";
import Error from "./pages/Error";
import Admin from "./pages/Admin";
import Games from "./pages/Games";
import DetaiGames from "./pages/DetaiGames";
import "./App.css"; // Đảm bảo Tailwind được cấu hình trong dự án của bạn
import Post from "./pages/Post";
import DetailPost from "./pages/DetailPost";

function App() {
  // Xác định nếu thiết bị là mobile/tablet
  const isMobileOrTablet = useMediaQuery({ maxWidth: 1024 });

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/figures" element={<Figures />} />
        <Route path="/places" element={<Places />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:idGame" element={<DetaiGames />} />
        {/* Kiểm tra thiết bị trước khi cho phép truy cập Admin */}
        <Route
          path="/admin"
          element={
            isMobileOrTablet ? (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <h2 className="text-xl font-bold text-red-500 mb-4">
                    Trang Admin không khả dụng trên thiết bị di động hoặc máy tính bảng.
                  </h2>
                  <Link
                    to="/"
                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                  >
                    Quay lại Trang Chủ
                  </Link>
                </div>
              </div>
            ) : (
              <Admin />
            )
          }
        />

        <Route path='/posts' element={<Post />}></Route>
        <Route path='/posts/:postId' element={<DetailPost />}></Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
