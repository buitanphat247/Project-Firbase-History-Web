import React from 'react';
import Lesson from '../Components/Lesson';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import ImageSwiper from '../Components/ImageSwiper';
const Home = () => {
    const lessonsData = [
        {
            topic: "Lịch sử cổ đại",
            lessons: [
                {
                    title: "Ai Cập cổ đại",
                    description: "Khám phá nền văn minh Ai Cập cổ đại và những công trình vĩ đại.",
                    image: "https://images2.thanhnien.vn/528068263637045248/2024/5/5/20-17148874476072022457880.jpg",
                },
                // Các bài học khác...
            ],
        },
        {
            topic: "Lịch sử trung đại",
            lessons: [
                {
                    title: "Ai Cập cổ đại",
                    description: "Khám phá nền văn minh Ai Cập cổ đại và những công trình vĩ đại.",
                    image: "https://images2.thanhnien.vn/528068263637045248/2024/5/5/20-17148874476072022457880.jpg",
                },
                // Các bài học khác...
            ],
        },
    ]; return (


        <>
            {/* <ImageSwiper></ImageSwiper> */}
            {lessonsData.map((topic, index) => (
                <div key={index} className="py-5">
                    <h2 className="text-3xl font-bold mb-6">{topic.topic}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {topic.lessons.map((lesson, i) => (
                            <Lesson
                                key={i}
                                title={lesson.title}
                                description={lesson.description}
                                image={lesson.image}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default Home;