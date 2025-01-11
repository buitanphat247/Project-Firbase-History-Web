import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Popconfirm, Modal, Form, Input, Spin } from 'antd';
import { addDocument, deleteDocument } from './../utils/firebaseActions';
import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './../firebase';

const TabLocation = () => {
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    // Fetch dữ liệu từ Firestore
    const fetchData = async () => {
        try {
            setLoadingData(true);
            const querySnapshot = await getDocs(collection(db, 'locations'));
            const fetchedData = querySnapshot.docs.map((doc) => ({
                key: doc.id, // Sử dụng ID làm key
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
                // Cập nhật dữ liệu
                const docRef = doc(db, 'locations', editingRecord.key);
                await updateDoc(docRef, {
                    ...values,
                    updatedAt: serverTimestamp(),
                });
                console.log('Dữ liệu đã được cập nhật:', values);
            } else {
                // Thêm dữ liệu mới
                const newLocation = {
                    ...values,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                };
                await addDocument('locations', newLocation);
                console.log('Dữ liệu đã được thêm:', values);
            }
    
            // Sau khi thêm hoặc cập nhật thành công, gọi lại fetchData
            await fetchData();
    
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
            await deleteDocument('locations', key);
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
            mapLink: record.mapLink,
            desc: record.desc,
            ...[...Array(5)].reduce((acc, _, index) => {
                acc[`image${index + 1}`] = record[`image${index + 1}`];
                return acc;
            }, {}),
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
            title: 'Tên Địa Điểm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Link Google Maps',
            dataIndex: 'mapLink',
            key: 'mapLink',
            render: (link) => (
                <a href={link} target="_blank" rel="noopener noreferrer">
                    Xem trên Google Maps
                </a>
            ),
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
                        title="Bạn có chắc chắn muốn xóa địa điểm này?"
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
                    Thêm Địa Điểm
                </Button>
            </div>
            <Spin spinning={loadingData}>
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
            </Spin>
            <Modal
                title={editingRecord ? 'Cập nhật Địa Điểm' : 'Thêm Địa Điểm'}
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
                        label="Tên Địa Điểm"
                        rules={[{ required: true, message: 'Vui lòng nhập tên địa điểm!' }]}
                    >
                        <Input placeholder="Nhập tên địa điểm" />
                    </Form.Item>
                    <Form.Item
                        name="mapLink"
                        label="Link Google Maps"
                        rules={[{ required: true, message: 'Vui lòng nhập link Google Maps!' }]}
                    >
                        <Input placeholder="Nhập link Google Maps" />
                    </Form.Item>
                    {[...Array(5)].map((_, index) => (
                        <Form.Item
                            key={`image-${index}`}
                            name={`image${index + 1}`}
                            label={`Link Hình Ảnh ${index + 1}`}
                            rules={[{ required: true, message: `Vui lòng nhập link hình ảnh ${index + 1}!` }]}
                        >
                            <Input placeholder={`Nhập link hình ảnh ${index + 1}`} />
                        </Form.Item>
                    ))}
                    <Form.Item
                        name="desc"
                        label="Mô Tả"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <Input.TextArea placeholder="Nhập mô tả về địa điểm" rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default TabLocation;
