import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Spin } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailGames = () => {
    const { idGame } = useParams(); // Lấy idGame từ URL
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({}); // Lưu câu trả lời của người chơi

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const docRef = doc(db, "games", idGame); // Truyền ID game vào
                const docSnap = await getDoc(docRef); // Lấy document theo ID
                if (docSnap.exists()) {
                    console.log("Game data:", docSnap.data());
                    setGame(docSnap.data()); // Lưu game vào state
                } else {
                    console.log("No such game!");
                }
            } catch (error) {
                console.error("Error fetching game: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [idGame]);

    // Xử lý lựa chọn của người chơi và kiểm tra đáp án
    const handleAnswerChange = (questionIndex, selectedOption) => {
        // Cập nhật câu trả lời
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: selectedOption,
        }));

        // Kiểm tra đúng hay sai và hiển thị thông báo
        const isCorrect = game.questions[questionIndex].correct === selectedOption;
        if (isCorrect) {
            toast.success("Chính xác! Bạn đã chọn đúng!", {
                position: "top-right",
                autoClose: 500,
            });
        } else {
            toast.error("Sai rồi! Hãy thử lại.", {
                position: "top-right",
                autoClose: 500,
            });
        }
    };

    // Nếu vẫn đang loading
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" tip="Đang tải dữ liệu..." />
            </div>
        );
    }

    if (!game) {
        return <p>No game data available.</p>;
    }

    return (
    <div className="container mx-auto px-4">
        <ToastContainer />
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">{game.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {Array.isArray(game.questions) && game.questions.length > 0 ? (
                game.questions.map((questionData, index) => (
                    <div key={index} className="bg-white p-4 shadow-md rounded-lg">
                        <h3 className="font-bold mb-4 text-sm md:text-base">{questionData.question}</h3>
                        <div>
                            {Array.isArray(questionData.answer) &&
                                questionData.answer.map((option, optIndex) => {
                                    const isSelected = answers[index] === optIndex;
                                    const isCorrect =
                                        isSelected &&
                                        game.questions[index].correct === optIndex;
    
                                    return (
                                        <div
                                            key={optIndex}
                                            className={`flex items-center p-2 border-2 rounded-lg mb-2 text-xs md:text-sm ${isSelected
                                                ? isCorrect
                                                    ? "border-green-500"
                                                    : "border-red-500"
                                                : "border-gray-300"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name={`question-${index}`}
                                                id={`question-${index}-option-${optIndex}`}
                                                className="mr-2"
                                                checked={isSelected}
                                                onChange={() =>
                                                    handleAnswerChange(index, optIndex)
                                                }
                                            />
                                            <label
                                                htmlFor={`question-${index}-option-${optIndex}`}
                                                className="text-gray-700"
                                            >
                                                {option}
                                            </label>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No questions found.</p>
            )}
        </div>
    </div>

    );
};

export default DetailGames;
