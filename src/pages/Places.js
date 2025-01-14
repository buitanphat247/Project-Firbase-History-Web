import React, { useState, useEffect } from 'react';
import { Modal, Button, Spin } from 'antd';
import InfoCard from '../Components/InfoCard';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'; // Giả định bạn đã cấu hình Firebase và xuất `db`

const Places = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [placesData, setPlacesData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from Firestore
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "locations")); // Thay "places" bằng tên collection trong Firestore của bạn
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPlacesData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching places from Firestore:", error);
                setLoading(false);
            }
        };

        fetchPlaces();
    }, []);

    const showModal = (place) => {
        setSelectedPlace(place);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Các Di Tích Lịch Sử</h2>

            {/* Hiển thị spinner nếu đang tải dữ liệu */}
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Spin size="large" tip="Đang tải dữ liệu..." />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {placesData.map((place) => {
                        // Kiểm tra dữ liệu trong console
                        console.log({
                            name: place.name,
                            images: [
                                place.image1,
                                place.image2,
                                place.image3,
                                place.image4,
                                place.image5,
                            ],
                            description: place.desc, // Thay đổi theo field trong Firestore
                            map: place.mapLink, // Thay đổi theo field trong Firestore
                        });

                        return (
                            <InfoCard
                                key={place.id}
                                item={{
                                    name: place.name,
                                    images: [
                                        place.image1,
                                        place.image2,
                                        place.image3,
                                        place.image4,
                                        place.image5,
                                    ],
                                    description: place.desc,
                                    map: place.mapLink,
                                }}
                                onClick={() => showModal(place)}
                            />
                        );
                    })}
                </div>

            )}

            {/* Modal hiển thị chi tiết */}
            <Modal
                title={selectedPlace?.name}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Đóng
                    </Button>,
                ]}
            >
                <div className="flex flex-col items-center">
                    <img
                        src={selectedPlace?.image1}
                        alt={selectedPlace?.name}
                        className="w-32 h-32 md:w-64 md:h-64 object-cover rounded-full mb-4"
                    />
                    <p className='text-sm md:text-base text-justify'>{selectedPlace?.desc}</p>
                </div>
            </Modal>
        </div>

    );
};

export default Places;
