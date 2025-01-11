import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <>
            <Header>    </Header>
            <div className="bg-slate-200 min-h-screen"> {/* Sử dụng màu nền sáng xám */}
                <div className='w-[80%] mx-auto py-5'>
                    <Outlet></Outlet>
                </div>
            </div>

            <Footer></Footer>
        </>
    );
};

export default MainLayout;