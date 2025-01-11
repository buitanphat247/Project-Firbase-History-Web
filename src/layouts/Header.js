import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation

const Header = () => {
    const location = useLocation(); // Lấy đường dẫn hiện tại
    const DataHeader = [
        {
            name: 'trang chủ',
            url: '/'
        },
        {
            name: 'Nhân vật',
            url: '/figures'
        },
        {
            name: 'di tích',
            url: '/places'
        },
        {
            name: 'bài viết',
            url: '/articles'
        },
        {
            name: 'mini games',
            url: '/games'
        },
        // {
        //     name: 'giới thiệu',
        //     url: '/about'
        // }
    ];

    return (
        <header className="bg-[#1f2937] text-white py-4 shadow-md ">
            <div className=" mx-auto flex justify-between items-center w-[80%]">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <Link to="/" className="hover:text-yellow-300">Lịch Sử Quê Hương</Link>
                </div>

                {/* Navigation */}
                <nav>
                    <ul className="flex space-x-6">
                        {DataHeader.map((item) => (
                            <li key={item.name}> {/* Sử dụng `name` làm key cho danh sách */}
                                <Link
                                    to={item.url}
                                    className={`capitalize ${location.pathname === item.url
                                        ? 'text-yellow-300 font-bold' // Mục active
                                        : 'hover:text-yellow-300'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
