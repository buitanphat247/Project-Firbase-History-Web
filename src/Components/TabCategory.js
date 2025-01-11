import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Spin, Table, Space, Popconfirm } from 'antd';
import { addDocument, deleteDocument } from './../utils/firebaseActions';
import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './../firebase';

const ManageCategory = () => {
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null); // Bản ghi đang chỉnh sửa
    const [form] = Form.useForm();

    // Fetch dữ liệu từ Firestore
    const fetchData = async () => {
        try {
            setLoadingData(true);
            const querySnapshot = await getDocs(collection(db, 'categories'));
            const fetchedData = querySnapshot.docs.map((doc) => ({
                key: doc.id, // ID của tài liệu làm key
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
        fetchData(); // Lấy dữ liệu khi component được mount
    }, []);

    // Thêm hoặc cập nhật dữ liệu
    const handleModalOk = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();

            if (editingRecord) {
                // Sửa dữ liệu
                const docRef = doc(db, 'categories', editingRecord.key);
                await updateDoc(docRef, {
                    name: values.name,
                    description: values.description,
                    updatedAt: serverTimestamp(),
                });

                // Cập nhật trực tiếp trong trạng thái `data`
                setData((prevData) =>
                    prevData.map((item) =>
                        item.key === editingRecord.key
                            ? { ...item, ...values, updatedAt: new Date() }
                            : item
                    )
                );
                console.log('Dữ liệu đã được cập nhật:', values);
            } else {
                // Thêm mới dữ liệu
                await addDocument('categories', {
                    name: values.name,
                    description: values.description,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                });

                await fetchData(); // Refresh dữ liệu
                console.log('Dữ liệu đã được thêm:', values);
            }

            // Đóng modal và reset form
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('Lỗi khi thêm hoặc cập nhật dữ liệu:', error);
        } finally {
            setLoading(false);
        }
    };

    // Xóa dữ liệu
    const handleDelete = async (key) => {
        try {
            await deleteDocument('categories', key);
            setData((prevData) => prevData.filter((item) => item.key !== key));
            console.log('Dữ liệu đã được xóa:', key);
        } catch (error) {
            console.error('Lỗi khi xóa dữ liệu:', error);
        }
    };

    // Mở modal để sửa dữ liệu
    const handleEdit = (record) => {
        setEditingRecord(record);
        setIsModalVisible(true);
        form.setFieldsValue({
            name: record.name,
            description: record.description,
        });
    };

    // Đóng modal
    const handleModalCancel = () => {
        form.resetFields();
        setEditingRecord(null);
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (timestamp) => (timestamp ? timestamp.toDate().toLocaleString() : 'Không có'),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa danh mục này?"
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
                <Button
                    type="primary"
                    onClick={() => setIsModalVisible(true)}
                    disabled={loadingData}
                >
                    Thêm Dữ Liệu
                </Button>
            </div>
            <Spin spinning={loadingData}>
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
            </Spin>
            <Modal
                title={editingRecord ? 'Cập nhật Danh mục' : 'Thêm Danh mục'}
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText="Xác nhận"
                cancelText="Hủy"
                confirmLoading={loading}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Tên danh mục"
                        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                    >
                        <Input placeholder="Nhập tên danh mục" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <Input placeholder="Nhập mô tả" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ManageCategory;
