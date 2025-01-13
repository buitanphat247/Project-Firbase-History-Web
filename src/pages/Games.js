// Import các hàm cần thiết từ Firebase SDK
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Spin } from "antd";
import { Navigate, NavLink } from "react-router-dom";

const Games = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true); // Bắt đầu tải
                const gamesCollection = collection(db, "games");
                const gamesSnapshot = await getDocs(gamesCollection);
                const gamesList = gamesSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setGames(gamesList); // Cập nhật dữ liệu
            } catch (error) {
                console.error("Error fetching games: ", error);
            } finally {
                setLoading(false); // Dừng tải
            }
        };

        fetchGames();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Game List</h1>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Spin size="large" /> {/* Hiển thị hiệu ứng xoay */}
                </div>
            ) : games.length === 0 ? (
                <p className="text-center text-gray-500">No games found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 cursor-pointer">
                    {games.map((game) => (
                        <NavLink to={`/games/${game.id}`}
                            key={game.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden border-2 cursor-pointer border-gray-200 transition-transform duration-300 hover:scale-105 hover:border-blue-500"
                        >
                            <img
                                src={game.image}
                                alt={game.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-2">
                                <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2">
                                    {game.name}
                                </h3>
                            </div>
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Games;
