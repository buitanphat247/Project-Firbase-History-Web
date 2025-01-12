import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Table, Popconfirm, message, Spin } from "antd"; // Importing Spin
import Editor from "./Editor";
import { addDocument, updateDocument, deleteDocument } from "../utils/firebaseActions"; // Import các hàm từ firebaseActions
import { getDocs, collection } from "firebase/firestore"; // Firebase functions để lấy dữ liệu
import { db } from "../firebase";

const TabPost = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editorContent, setEditorContent] = useState(""); // State to store editor content
    const [posts, setPosts] = useState([]); // State to store all posts
    const [editingPost, setEditingPost] = useState(null); // For editing existing post
    const [loading, setLoading] = useState(false); // State to track loading for save
    const [loadingData, setLoadingData] = useState(false); // State to track data fetching

    // Fetch data from Firebase
    const fetchPostsData = async () => {
        setLoadingData(true); // Set loading state to true while fetching
        try {
            const querySnapshot = await getDocs(collection(db, "posts"));
            const fetchedPosts = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                key: doc.id, // Thêm ID của document vào mỗi post để dễ quản lý
            }));
            setPosts(fetchedPosts);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
            message.error("Lỗi khi lấy dữ liệu từ Firebase!");
        } finally {
            setLoadingData(false); // Set loading to false after fetching is done
        }
    };

    // Fetch data when component loads
    useEffect(() => {
        fetchPostsData(); // Fetch data on component mount
    }, []); // Only run once on component mount

    // Open modal for adding new post
    const handleOpenModal = () => {
        setIsModalVisible(true);
        setEditingPost(null); // Clear editing state when adding new post
    };

    // Close modal
    const handleCloseModal = () => {
        setIsModalVisible(false);
        setEditorContent(""); // Reset content after modal closes
    };

    // Save data (either add new post or edit existing post)
    const handleSave = async (values) => {
        try {
            setLoading(true); // Set loading state to true while saving

            // Tạo đối tượng data mới gồm các giá trị form và nội dung từ editor
            const data = {
                ...values,
                content: editorContent,
                updatedAt: new Date().toLocaleString(), // Đảm bảo có thời gian cập nhật
            };

            // Kiểm tra nếu đang chỉnh sửa bài viết
            if (editingPost) {
                // Sửa dữ liệu trong state (update ở UI)
                const updatedPosts = posts.map(post =>
                    post.key === editingPost.key ? { ...post, ...data } : post
                );
                setPosts(updatedPosts); // Cập nhật danh sách bài viết trong state

                // Cập nhật dữ liệu vào Firebase
                await updateDocument('posts', editingPost.key, data);
                message.success("Bài viết được cập nhật thành công!");
            } else {
                // Thêm mới bài viết vào Firebase
                await addDocument('posts', data); // Dùng addDocument để thêm mới bài viết

                // Thêm bài viết mới vào local state
                const newPost = {
                    key: posts.length + 1, // Tạo khóa duy nhất
                    ...data,
                    dateCreated: new Date().toLocaleString(),
                };
                setPosts(prevPosts => [...prevPosts, newPost]); // Thêm mới vào danh sách bài viết

                message.success("Bài viết được thêm mới thành công!");
            }

            // Đóng modal và reset form
            handleCloseModal();
        } catch (error) {
            console.error('Lỗi khi lưu dữ liệu:', error);
            message.error("Lỗi khi lưu dữ liệu!");
        } finally {
            setLoading(false); // Set loading state về false khi kết thúc thao tác
        }
    };

    // Edit an existing post
    const handleEdit = (post) => {
        setEditingPost(post);
        setEditorContent(post.content); // Set the content for the editor
        setIsModalVisible(true); // Open modal to edit
    };

    // Delete a post
    const handleDelete = async (key) => {
        try {
            await deleteDocument('posts', key); // Gọi hàm deleteDocument từ firebaseActions
            setPosts(posts.filter(post => post.key !== key)); // Cập nhật lại danh sách bài viết trong state
            message.success("Bài viết đã được xóa!");
        } catch (error) {
            console.error("Lỗi khi xóa dữ liệu:", error);
            message.error("Lỗi khi xóa bài viết!");
        }
    };

    const columns = [

        {
            title: 'Tên Bài Viết',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Tác Giả',
            dataIndex: 'author',
            key: 'author',
            render: (text, record) => <div>Admin</div>
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (timestamp) => (timestamp ? timestamp.toDate().toLocaleString() : 'Không có'),
        },
        {
            title: 'Hành Động',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button onClick={() => handleEdit(record)} type="link">
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa bài viết này?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="link" danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                    <Button type="link">Xem</Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="flex justify-end pb-5">
                <Button
                    disabled={loadingData}
                    type="primary" onClick={handleOpenModal}>
                    Thêm Bài Viết
                </Button>
            </div>

            <Spin spinning={loadingData}>
                <Table
                    columns={columns}
                    dataSource={posts}
                    pagination={false}
                    rowKey="key"
                    style={{ marginBottom: 20 }}
                />
            </Spin>

            {/* Modal for adding or editing post */}
            <Modal
                title={editingPost ? "Chỉnh Sửa Bài Viết" : "Thêm Bài Viết"}
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
                width="80%"
            >
                <Form
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={editingPost || { title: '', thumbnail: '' }}
                >
                    <Form.Item
                        name="title"
                        label="Tên Bài Viết"
                        rules={[{ required: true, message: "Vui lòng nhập tên bài viết!" }]}
                    >
                        <Input placeholder="Nhập tên bài viết" />
                    </Form.Item>

                    <Form.Item
                        name="thumbnail"
                        label="Link Ảnh Đại Diện"
                        rules={[{ required: true, message: "Vui lòng nhập link ảnh đại diện!" }]}
                    >
                        <Input placeholder="Nhập link ảnh đại diện" />
                    </Form.Item>

                    <Form.Item
                        name="content"
                        label="Nội dung bài viết"
                        rules={[{ message: "Vui lòng nhập nội dung bài viết!" }]}
                    >
                        <Editor setEditorContent={setEditorContent} content={editorContent} />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                        {editingPost ? "Cập Nhật Bài Viết" : "Thêm Bài Viết"}
                    </Button>
                </Form>
            </Modal>
        </>
    );
};

export default TabPost;
