import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false); // Add state for mobile menu
    const location = useLocation(); // Get current path
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
            url: '/posts'
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
        <header className="bg-[#1f2937] text-white py-4 shadow-md">
            <div className="px-4 md:px-8">
                <div className="flex justify-between items-center lg:w-[80%] mx-auto">
                    {/* Logo */}
                    <div className="text-xl md:text-2xl font-bold">
                        <Link to="/" className="hover:text-yellow-300">Lịch Sử Quê Hương</Link>
                    </div>

                    {/* Menu Icon for Mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-white focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex">
                        <nav>
                            <ul className="flex space-x-4 md:space-x-6">
                                {DataHeader.map((item) => (
                                    <li key={item.name}> {/* Use `name` as key for list */}
                                        <Link
                                            to={item.url}
                                            className={`capitalize ${location.pathname === item.url
                                                ? 'text-yellow-300 font-bold' // Active menu
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
                </div>

                {/* Sidebar Navigation */}
                <div
                    className={`fixed top-0 left-0 h-full bg-[#1f2937] text-white w-64 z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <div className="p-4">
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="text-white focus:outline-none mb-4"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <ul className="space-y-4">
                            {DataHeader.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.url}
                                        className={`capitalize block ${location.pathname === item.url
                                            ? 'text-yellow-300 font-bold' // Active menu
                                            : 'hover:text-yellow-300'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </header>

    );
};

export default Header;
