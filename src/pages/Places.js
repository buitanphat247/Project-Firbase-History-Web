import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import InfoCard from '../Components/InfoCard';

const Places = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const placesData = [
        {
            name: 'Khu di tích Hoàng Thành Thăng Long',
            image: 'URL_IMAGE',
            description: 'Khu di tích lịch sử quan trọng ở Hà Nội...',
            detailedInfo: 'Thông tin chi tiết...',
        },
        {
            name: 'Khu di tích Hoàng Thành Thăng Long',
            image: 'URL_IMAGE',
            description: 'Khu di tích lịch sử quan trọng ở Hà Nội...',
            detailedInfo: 'Thông tin chi tiết...',
        },
        {
            name: 'Khu di tích Hoàng Thành Thăng Long',
            image: 'URL_IMAGE',
            description: 'Khu di tích lịch sử quan trọng ở Hà Nội...',
            detailedInfo: 'Thông tin chi tiết...',
        },
        {
            name: 'Khu di tích Hoàng Thành Thăng Long',
            image: 'URL_IMAGE',
            description: 'Khu di tích lịch sử quan trọng ở Hà Nội...',
            detailedInfo: 'Thông tin chi tiết...',
        },
        {
            name: 'Khu di tích Hoàng Thành Thăng Long',
            image: 'URL_IMAGE',
            description: 'Khu di tích lịch sử quan trọng ở Hà Nội...',
            detailedInfo: 'Thông tin chi tiết...',
        },
        {
            name: 'Khu di tích Hoàng Thành Thăng Long',
            image: 'URL_IMAGE',
            description: 'Khu di tích lịch sử quan trọng ở Hà Nội...',
            detailedInfo: 'Thông tin chi tiết...',
        },
        {
            name: 'Khu di tích Hoàng Thành Thăng Long',
            image: 'URL_IMAGE',
            description: 'Khu di tích lịch sử quan trọng ở Hà Nội...',
            detailedInfo: 'Thông tin chi tiết...',
        },
        // Các di tích khác
    ];

    const showModal = (place) => {
        setSelectedPlace(place);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Các Di Tích Lịch Sử</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {placesData.map((place, index) => (
                    <InfoCard
                        key={index}
                        item={place}
                        onClick={() => showModal(place)}
                    />
                ))}
            </div>
            <Modal
                title={selectedPlace?.name}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Đóng
                    </Button>,
                ]}
            >
                <div className="flex flex-col items-center">
                    <img src={selectedPlace?.image} alt={selectedPlace?.name} className="w-64 h-64 object-cover rounded-full mb-4" />
                    <p>{selectedPlace?.detailedInfo}</p>
                </div>
            </Modal>
        </div>
    );
};

export default Places;
