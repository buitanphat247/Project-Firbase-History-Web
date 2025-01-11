import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, InputNumber, Spin } from 'antd';
import GameTable from './GameTable';
import QuestionForm from './QuestionForm';
import { addDocument } from '../utils/firebaseActions'; // Import hàm thêm dữ liệu vào Firebase
import { collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'; // Import cấu hình Firebase

const TabGame = () => {
    const [data, setData] = useState([]); // Dữ liệu game
    const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái modal
    const [form] = Form.useForm(); // Form của modal
    const [questions, setQuestions] = useState([]); // Danh sách câu hỏi
    const [numQuestions, setNumQuestions] = useState(0); // Số lượng câu hỏi
    const [loading, setLoading] = useState(false); // Trạng thái loading khi thêm dữ liệu
    const [loadingData, setLoadingData] = useState(false); // Trạng thái loading khi fetch dữ liệu

    // Hiển thị modal
    const handleAdd = () => {
        setIsModalVisible(true);
        form.resetFields();
        setQuestions([]);
        setNumQuestions(0);
    };

    // Đóng modal
    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setQuestions([]);
    };

    // Xử lý khi nhấn "Xác nhận"
    const handleModalOk = async () => {
        try {
            setLoading(true); // Hiển thị trạng thái loading
            const values = await form.validateFields(); // Lấy giá trị từ form
            const newGame = {
                name: values.name, // Tên game
                image: values.image, // Link ảnh đại diện
                questions, // Danh sách câu hỏi
                createdAt: serverTimestamp(), // Thời gian tạo
            };

            // Thêm dữ liệu vào Firebase
            await addDocument('games', newGame);

            console.log('Dữ liệu game mới:', newGame); // Log ra dữ liệu game mới
            setData((prevData) => [...prevData, { ...newGame, key: prevData.length + 1 }]);

            setIsModalVisible(false); // Đóng modal
        } catch (error) {
            console.error('Lỗi khi thêm game:', error); // Log lỗi nếu có
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    };

    // Xử lý thêm số lượng câu hỏi
    const handleAddQuestions = (value) => {
        setNumQuestions(value);
        const newQuestions = Array.from({ length: value }, (_, i) => ({
            question: '',
            answers: ['', '', '', ''],
            correct: null,
        }));
        setQuestions(newQuestions);
    };

    // Cập nhật câu hỏi hoặc đáp án
    const handleQuestionChange = (updatedQuestions) => {
        setQuestions(updatedQuestions);
    };

    // Fetch dữ liệu từ Firebase
    const fetchGames = async () => {
        try {
            setLoadingData(true); // Hiển thị trạng thái loading
            const querySnapshot = await getDocs(collection(db, 'games')); // Lấy dữ liệu từ Firestore
            const fetchedData = querySnapshot.docs.map((doc) => ({
                key: doc.id, // ID tài liệu làm key
                ...doc.data(),
            }));
            setData(fetchedData); // Gán dữ liệu vào bảng
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu:', error);
        } finally {
            setLoadingData(false); // Tắt trạng thái loading
        }
    };

    // Gọi fetchGames khi component được mount
    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <>
            <div className="flex justify-end pb-5">
                <Button type="primary" onClick={handleAdd}
                    disabled={loadingData}
                >
                    Thêm Game
                </Button>
            </div>
            <Spin spinning={loadingData}>
                <GameTable data={data} setData={setData} />
            </Spin>
            <Modal
                title="Thêm Game"
                visible={isModalVisible}
                onCancel={handleModalCancel}
                onOk={handleModalOk}
                okText="Xác nhận"
                cancelText="Hủy"
                width="80%"
                confirmLoading={loading} // Hiển thị trạng thái loading khi thêm dữ liệu
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Tên Game"
                        rules={[{ required: true, message: 'Vui lòng nhập tên game!' }]}
                    >
                        <Input placeholder="Nhập tên game" />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Link Ảnh Đại Diện"
                        rules={[{ required: true, message: 'Vui lòng nhập link ảnh!' }]}
                    >
                        <Input placeholder="Nhập link ảnh đại diện" />
                    </Form.Item>
                    <Form.Item label="Số lượng câu hỏi">
                        <InputNumber
                            min={1}
                            max={100}
                            placeholder="Nhập số câu hỏi"
                            onChange={handleAddQuestions}
                        />
                    </Form.Item>
                    <QuestionForm
                        questions={questions}
                        numQuestions={numQuestions}
                        onChange={handleQuestionChange}
                        questionsPerRow={3} // Hiển thị 3 câu trên mỗi hàng
                    />
                </Form>
            </Modal>
        </>
    );
};

export default TabGame;
