import React from 'react';

const HistoricalCharacterCard = ({ character }) => {
    return (
        <div className="bg-white rounded-lg  shadow-lg overflow-hidden border-2 cursor-pointer border-gray-200 transition-transform duration-300 hover:scale-105 hover:border-blue-500">
            <img
                src={character.image}
                alt={character.name}
                className="w-full h-64 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{character.name}</h3>
                <p className="mt-2 text-gray-600 line-clamp-2">{character.description}</p>
            </div>
        </div>
    );
};

export default HistoricalCharacterCard;
