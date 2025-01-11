import React from 'react';

const InfoCard = ({ item, onClick }) => {
    return (
        <div
            className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 transition-transform duration-300 hover:scale-105 hover:border-blue-500 cursor-pointer"
            onClick={onClick}
        >
            <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
                <p className="mt-2 text-gray-600 line-clamp-2">{item.description}</p>
            </div>
        </div>
    );
};

export default InfoCard;
