import React from 'react';
import { NavLink } from 'react-router-dom';

const CardPost = ({ imageUrl, title, date, to }) => { // Thêm props `to`
    return (
        <NavLink to={to}> {/* Bọc component trong NavLink */}
            <div className="max-w-sm rounded overflow-hidden shadow-lg min-h-[300px]">
                <div className="w-full h-48">
                    <img
                        className="w-full h-full object-cover"
                        src={imageUrl}
                        alt={title}
                    />
                </div>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 line-clamp-2">{title}</div>
                </div>
            </div>
        </NavLink>
    );
};

export default CardPost;