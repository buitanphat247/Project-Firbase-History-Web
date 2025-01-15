import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import DOMPurify from 'dompurify';
import { Spin } from 'antd';


const DetailPost = () => {
    const { postId } = useParams(); // Lấy postId từ URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Khởi tạo useNavigate


    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "posts", postId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPost({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such document!");
                    // Xử lý trường hợp không tìm thấy bài viết
                }
            } catch (error) {
                console.error("Error fetching data from Firestore:", error);
                // Xử lý lỗi
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [postId]); // Chỉ fetch lại khi postId thay đổi

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" tip="Đang tải dữ liệu..." />
            </div>
        );
    }

    const handleGoBack = () => {
        navigate(-1); // Quay lại trang trước đó
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-center">{post.title}</h1>
            <div
                className="prose lg:prose-xl"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
            />
            <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleGoBack}
            >
                Quay lại
            </button>   </div>
    );
};

export default DetailPost;