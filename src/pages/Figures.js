import React, { useState, useEffect } from 'react';
import { Modal, Button, Spin } from 'antd';
import HistoricalCharacterCard from '../Components/HistoricalCharacterCard';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

const Figures = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [charactersData, setCharactersData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from Firestore
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "characters"));
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCharactersData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching characters from Firestore:", error);
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    const showModal = (character) => {
        setSelectedCharacter(character);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Nhân Vật Lịch Sử</h2>

            {/* Loading Spinner */}
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Spin size="large" tip="Đang tải dữ liệu..." />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {charactersData.map((character) => (
                        <div key={character.id} onClick={() => showModal(character)}>
                            <HistoricalCharacterCard
                                character={{
                                    name: character.name,
                                    image: character.image,
                                    description: character.desc, // Thay "desc" bằng field Firestore của bạn nếu khác
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Ant Design */}
            <Modal
                title={selectedCharacter?.name}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Đóng
                    </Button>
                ]}
            >
                <div className="flex flex-col items-center">
                    <img
                        src={selectedCharacter?.image}
                        alt={selectedCharacter?.name}
                        className="w-32 h-32 object-cover rounded-full mb-4"
                    />
                    <p className='text-justify'>{selectedCharacter?.desc}</p>
                </div>
            </Modal>
        </div>
    );
};

export default Figures;
