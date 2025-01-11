import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <h2 className="text-2xl font-semibold mt-4">Oops! Trang không tồn tại</h2>
            <p className="text-gray-600 mt-2">Trang bạn tìm kiếm không được tìm thấy. Có thể bạn đã nhập sai đường dẫn hoặc trang này đã bị xóa.</p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            >
                Quay lại trang chủ
            </Link>
        </div>
    );
};

export default Error;
