import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { getDocs, collection } from 'firebase/firestore';
import CardPost from '../Components/CardPost';
import { db } from '../firebase';

const Post = () => {
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postSnapshot = await getDocs(collection(db, "posts"));

                const postData = postSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setPostData(postData);
            } catch (error) {
                console.error("Error fetching data from Firestore:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" tip="Đang tải dữ liệu..." />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {postData.map((post) => (
                <div key={post.id} className="cursor-pointer">
                    <CardPost
                        imageUrl={post.thumbnail}
                        title={post.title}
                        to={`/posts/${post.id}`}
                    />
                </div>
            ))}
        </div>
    );
};

export default Post;