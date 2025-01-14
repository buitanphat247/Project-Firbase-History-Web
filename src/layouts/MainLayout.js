import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <>
            <Header>    </Header>
            <div className="bg-slate-200 min-h-screen"> {/* Sử dụng màu nền sáng xám */}
                <div className='py-5 xl:container xl:mx-auto'>
                    <Outlet></Outlet>
                </div>
            </div>

            <Footer></Footer>
        </>
    );
};

export default MainLayout;