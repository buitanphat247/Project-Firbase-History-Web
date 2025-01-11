import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Popconfirm, Modal, Form, Input, DatePicker, Spin } from 'antd';
import { addDocument, deleteDocument } from '../utils/firebaseActions';
import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import dayjs from 'dayjs';

const TabCharacter = () => {
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingData, setLoadingData] = useState(false); // Trạng thái tải dữ liệu
    const [loading, setLoading] = useState(false); // Thêm trạng thái loading
    const [editingRecord, setEditingRecord] = useState(null); // Bản ghi đang chỉnh sửa
    const [form] = Form.useForm();

    // Fetch dữ liệu từ Firestore
    const fetchData = async () => {
        try {
            setLoadingData(true);
            const querySnapshot = await getDocs(collection(db, 'characters'));
            const fetchedData = querySnapshot.docs.map((doc) => ({
                key: doc.id, // Sử dụng ID của tài liệu làm key
                ...doc.data(),
            }));
            setData(fetchedData);
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu:', error);
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        fetchData(); // Gọi hàm fetchData khi component được mount
    }, []);

    // Xử lý hiển thị modal
    const handleAdd = () => {
        setEditingRecord(null);
        setIsModalVisible(true);
    };

    // Xử lý khi nhấn "Xác nhận" trên modal
    const handleModalOk = async () => {
        try {
            setLoading(true); // Hiển thị spin
            const values = await form.validateFields(); // Lấy dữ liệu từ form
            const newCharacter = {
                ...values,
                dob: values.dob ? values.dob.format('YYYY-MM-DD') : null, // Chuyển ngày sinh thành chuỗi định dạng
                dod: values.dod ? values.dod.format('YYYY-MM-DD') : null, // Chuyển ngày mất thành chuỗi định dạng
                updatedAt: serverTimestamp(),
                createdAt: editingRecord ? editingRecord.createdAt : serverTimestamp(),
            };

            if (editingRecord) {
                // Cập nhật dữ liệu
                const docRef = doc(db, 'characters', editingRecord.key);
                await updateDoc(docRef, newCharacter);
                setData((prevData) =>
                    prevData.map((item) =>
                        item.key === editingRecord.key ? { ...item, ...newCharacter } : item
                    )
                );
                console.log('Dữ liệu đã được cập nhật:', newCharacter);
            } else {
                // Thêm dữ liệu mới
                await addDocument('characters', newCharacter);
                setData((prevData) => [...prevData, { key: prevData.length + 1, ...newCharacter }]);
                console.log('Dữ liệu đã được thêm:', newCharacter);
            }

            // Đóng modal và reset form
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('Lỗi khi thêm hoặc cập nhật dữ liệu:', error);
        } finally {
            setLoading(false); // Ẩn spin
        }
    };

    // Xử lý khi nhấn "Hủy" trên modal
    const handleModalCancel = () => {
        if (!loading) {
            setIsModalVisible(false);
            form.resetFields();
        }
    };

    // Xóa dữ liệu
    const handleDelete = async (key) => {
        try {
            await deleteDocument('characters', key); // Gọi hàm xóa
            setData((prevData) => prevData.filter((item) => item.key !== key));
        } catch (error) {
            console.error('Lỗi khi xóa dữ liệu:', error);
        }
    };

    // Mở modal để sửa dữ liệu
    const handleEdit = (record) => {
        setEditingRecord(record);
        setIsModalVisible(true);
        form.setFieldsValue({
            image: record.image,
            name: record.name,
            dob: record.dob ? dayjs(record.dob) : null, // Chuyển giá trị ngày sinh
            dod: record.dod ? dayjs(record.dod) : null, // Chuyển giá trị ngày mất
            desc: record.desc,
        });
    };

    const columns = [
        {
            title: 'Hình Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image} alt="Character" style={{ width: 50, height: 50 }} />,
        },
        {
            title: 'Tên Nhân Vật',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày Sinh',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Ngày Mất',
            dataIndex: 'dod',
            key: 'dod',
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (timestamp) =>
                timestamp?.toDate ? timestamp.toDate().toLocaleDateString('vi-VN') : 'Không có',
        },
         {
            title: 'Hành Động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa nhân vật này?"
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
            <div className="flex justify-end pb-5">
                <Button type="primary" onClick={handleAdd} disabled={loadingData}>
                    Thêm Nhân Vật
                </Button>
            </div>
            <Spin spinning={loadingData}>
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
            </Spin>

            {/* Modal Thêm Nhân Vật */}
            <Modal
                title={editingRecord ? 'Cập nhật Nhân Vật' : 'Thêm Nhân Vật'}
                visible={isModalVisible}
                onCancel={handleModalCancel}
                footer={[
                    <Button key="cancel" onClick={handleModalCancel} disabled={loading}>
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading} // Hiển thị spin trên nút "Xác nhận"
                        onClick={handleModalOk}
                    >
                        Xác nhận
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="image"
                        label="Link Hình Ảnh"
                        rules={[{ required: true, message: 'Vui lòng nhập link hình ảnh!' }]}
                    >
                        <Input placeholder="Nhập link hình ảnh" />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Tên Nhân Vật"
                        rules={[{ required: true, message: 'Vui lòng nhập tên nhân vật!' }]}
                    >
                        <Input placeholder="Nhập tên nhân vật" />
                    </Form.Item>
                    <Form.Item
                        name="dob"
                        label="Ngày Sinh"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                    >
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                    <Form.Item
                        name="dod"
                        label="Ngày Mất"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày mất!' }]}
                    >
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                    <Form.Item
                        name="desc"
                        label="Mô Tả"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <Input.TextArea placeholder="Nhập mô tả về nhân vật" rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default TabCharacter;
