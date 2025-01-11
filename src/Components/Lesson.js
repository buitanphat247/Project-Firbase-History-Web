// src/components/Lesson.js
import React from "react";

const Lesson = ({ title, description, image }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 cursor-pointer transition-transform duration-300 hover:scale-105 hover:border-blue-500">
            <img src={image} alt={title} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-gray-600 mt-2">{description}</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full">
                    Xem chi tiết bài viết
                </button>
            </div>
        </div>
    );
};

export default Lesson;
