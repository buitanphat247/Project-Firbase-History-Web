import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import HistoricalCharacterCard from '../Components/HistoricalCharacterCard';

const Figures = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const charactersData = [
        {
            name: 'Trần Hưng Đạo',
            image: 'https://c2nguyenhue.chauduc-brvt.edu.vn/upload/62991/20231017/viewimage_adf22.jpg',
            description: 'Trần Hưng Đạo là một trong những tướng lĩnh xuất sắc của Việt Nam, nổi tiếng với chiến công chống quân Mông Cổ.',
            detailedInfo: 'Trần Hưng Đạo, tên thật là Trần Quốc Tuấn, là một trong những vị tướng huyền thoại của lịch sử Việt Nam. Ông nổi tiếng với tài chiến lược và các chiến công trong cuộc chiến chống quân Mông Cổ.',
        },
        {
            name: 'Nguyễn Huệ',
            image: 'https://icdn.dantri.com.vn/2017/vothisau-1501109788176.jpg',
            description: 'Nguyễn Huệ, hay còn gọi là Quang Trung, là vị vua anh hùng nổi bật trong lịch sử Việt Nam, nổi tiếng với chiến thắng Ngọc Hồi.',
            detailedInfo: 'Nguyễn Huệ là một trong những vị vua tài ba, lập nên nhiều chiến công hiển hách trong lịch sử Việt Nam. Ông còn được biết đến với chiến thắng lừng lẫy trước quân Thanh trong trận Ngọc Hồi.',
        },
        {
            name: 'Lê Lợi',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Le_Loi.jpg/250px-Le_Loi.jpg',
            description: 'Lê Lợi là người sáng lập triều đại nhà Lê, nổi tiếng với cuộc khởi nghĩa Lam Sơn.',
            detailedInfo: 'Lê Lợi là lãnh đạo của cuộc khởi nghĩa Lam Sơn, đánh bại quân Minh và sáng lập triều đại nhà Lê. Ông được tôn vinh là một trong những vị anh hùng dân tộc.',
        },
        {
            name: 'Hồ Chí Minh',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Ho_Chi_Minh_1946.jpg/250px-Ho_Chi_Minh_1946.jpg',
            description: 'Hồ Chí Minh là lãnh tụ vĩ đại của Việt Nam, người đã dẫn dắt cách mạng giành độc lập cho dân tộc.',
            detailedInfo: 'Hồ Chí Minh, tên khai sinh là Nguyễn Sinh Cung, sau đổi thành Nguyễn Ái Quốc, là nhà cách mạng vĩ đại, lãnh tụ của dân tộc Việt Nam. Ông là người sáng lập Đảng Cộng sản Việt Nam và dẫn dắt đất nước trong cuộc chiến giành độc lập.',
        },
        {
            name: 'Võ Thị Sáu',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Vo_Thi_Sau.jpg/250px-Vo_Thi_Sau.jpg',
            description: 'Võ Thị Sáu là nữ anh hùng của dân tộc, hy sinh vì sự nghiệp đấu tranh giành độc lập.',
            detailedInfo: 'Võ Thị Sáu là một trong những nữ anh hùng trẻ tuổi nhất trong lịch sử Việt Nam. Bà đã hy sinh vì lý tưởng cách mạng, trở thành biểu tượng của tinh thần yêu nước kiên cường.',
        },
        {
            name: 'Trưng Trắc và Trưng Nhị',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Trung_sisters.jpg/250px-Trung_sisters.jpg',
            description: 'Hai Bà Trưng là biểu tượng của sự kháng chiến chống lại ách đô hộ của phương Bắc.',
            detailedInfo: 'Hai Bà Trưng, Trưng Trắc và Trưng Nhị, là những vị nữ anh hùng nổi tiếng trong lịch sử Việt Nam. Họ đã lãnh đạo cuộc khởi nghĩa chống lại quân Đông Hán vào thế kỷ thứ 1.',
        },
        {
            name: 'Phan Bội Châu',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Phan_Boi_Chau.jpg/250px-Phan_Boi_Chau.jpg',
            description: 'Phan Bội Châu là nhà yêu nước và nhà cách mạng nổi bật trong phong trào chống Pháp.',
            detailedInfo: 'Phan Bội Châu là nhà văn hóa, nhà yêu nước và nhà cách mạng nổi bật trong lịch sử hiện đại Việt Nam. Ông là người sáng lập phong trào Đông Du và đã có những đóng góp lớn cho phong trào chống thực dân Pháp.',
        },
    ];


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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {charactersData.map((character, index) => (
                    <div key={index} onClick={() => showModal(character)}>
                        <HistoricalCharacterCard character={character} />
                    </div>
                ))}
            </div>

            {/* Modal Ant Design */}
            <Modal
                title={selectedCharacter?.name}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Đóng
                    </Button>
                ]}
            >
                <div className="flex flex-col items-center">
                    <img src={selectedCharacter?.image} alt={selectedCharacter?.name} className="w-32 h-32 object-cover rounded-full mb-4" />
                    <p>{selectedCharacter?.detailedInfo}</p>
                </div>
            </Modal>
        </div>
    );
};

export default Figures;
