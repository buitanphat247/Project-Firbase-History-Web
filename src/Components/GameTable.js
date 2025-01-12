import React, { useState } from 'react';
import { Table, Button, Space, Popconfirm, Modal, Form, Input, List } from 'antd';
import QuestionForm from './QuestionForm';
import { deleteDocument, updateDocument } from '../utils/firebaseActions';

const GameTable = ({ data, setData }) => {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [viewingQuestions, setViewingQuestions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false); // Loading trạng thái khi update dữ liệu

    // Xóa dữ liệu
    const handleDelete = async (key) => {
        console.log('key: ', key);
        try {
            await deleteDocument('games', key);
            setData((prevData) => prevData.filter((item) => item.key !== key));
        } catch (error) {
            console.error('Lỗi khi xóa dữ liệu:', error);
        }
    };

    // Hiển thị modal sửa
    const handleEdit = (record) => {
        setEditingRecord(record);
        setQuestions(record.questions || []);
        form.setFieldsValue({
            name: record.name,
            image: record.image,
        });
        setIsEditModalVisible(true);
    };

    // Đóng modal sửa
    const handleEditModalCancel = () => {
        setIsEditModalVisible(false);
        form.resetFields();
        setEditingRecord(null);
        setQuestions([]);
    };

    // Lưu dữ liệu đã chỉnh sửa
    const handleEditModalOk = async () => {
        try {
            setLoading(true); // Bật trạng thái loading
            const values = await form.validateFields();
            const updatedGame = {
                ...editingRecord,
                ...values,
                questions,
            };

            if (editingRecord.key) {
                await updateDocument('games', editingRecord.key, updatedGame);
            } else {
                console.error('Không tìm thấy key của bản ghi để cập nhật.');
                return;
            }

            setData((prevData) =>
                prevData.map((item) =>
                    item.key === editingRecord.key ? { ...item, ...updatedGame } : item
                )
            );

            setIsEditModalVisible(false);
            form.resetFields();
            setEditingRecord(null);
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu:', error);
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    };

    // Hiển thị modal "Xem"
    const handleView = (record) => {
        const questions = record.questions || [];  // Nếu không có questions, gán mảng rỗng
        setViewingQuestions(questions);
        setIsViewModalVisible(true);
    };


    // Đóng modal "Xem"
    const handleViewModalCancel = () => {
        setIsViewModalVisible(false);
        setViewingQuestions([]);
    };

    const columns = [
        {
            title: 'Tên Game',
            dataIndex: 'name',
            key: 'name',
        },
        // Các cột khác ở đây
        {
            title: 'Hành Động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Sửa
                    </Button>
                    <Button type="link" onClick={() => handleView(record)}>
                        Xem
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa game này?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="link" danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    return (
        <>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
            {/* Modal Sửa */}
            <Modal
                title="Sửa Game"
                visible={isEditModalVisible}
                onCancel={handleEditModalCancel}
                onOk={handleEditModalOk}
                okText="Lưu"
                cancelText="Hủy"
                width="80%"
                confirmLoading={loading}
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
                    <QuestionForm
                        questions={questions}
                        onChange={setQuestions}
                        questionsPerRow={3}
                    />
                </Form>
            </Modal>
            {/* Modal Xem */}
            <Modal
                title="Xem Câu Hỏi"
                visible={isViewModalVisible}
                onCancel={handleViewModalCancel}
                footer={[
                    <Button key="close" onClick={handleViewModalCancel}>
                        Đóng
                    </Button>,
                ]}
            >
                <List
                    dataSource={viewingQuestions || []}  // Nếu viewingQuestions là undefined hoặc null, thay bằng mảng rỗng
                    renderItem={(item, index) => {
                        console.log(item);  // In ra item để kiểm tra cấu trúc
                        return (
                            <List.Item>
                                <div>
                                    <strong>
                                        Câu {index + 1}:
                                    </strong>
                                    {/* Xử lý loại bỏ chữ "Câu" đến dấu chấm đầu tiên */}
                                    {item.question ? item.question.replace(/^(Câu\s*[\d]+.*?[\.\?])/i, '') : 'Không có câu hỏi'}
                                    <br />
                                    {item.answer && item.answer.length > 0 ? (
                                        item.answer.map((ans, i) => (
                                            <div key={i}>
                                                <span
                                                    style={{
                                                        color: item.correct === i ? 'green' : 'black',  // Đánh dấu đáp án đúng với màu xanh
                                                    }}
                                                >
                                                    Đáp Án: {ans}  {/* Biểu diễn A, B, C, D */}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <span>Không có đáp án</span>  // Nếu không có đáp án
                                    )}
                                </div>
                            </List.Item>


                        );
                    }}
                />


            </Modal>
        </>
    );
};

export default GameTable;
