// src/components/ImageSwiper.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const ImageSwiper = () => {
    const images = [
        "https://m.yodycdn.com/blog/di-tich-lich-su-viet-nam-1.jpg", // Ví dụ ảnh 1
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA4a9_ptU9MFY4y2x9tQ11CNW6BZ5p9BG4HQ&s", // Ví dụ ảnh 2
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Oyz8Kiv4IxNaCyafkQMF1FlXUloSE4DGVQ&s", // Ví dụ ảnh 3
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp1FguSdL-g-AVhUPZ1ejwt2oYD8go6fWIxQ&s", // Ví dụ ảnh 4
        "https://m.yodycdn.com/blog/di-tich-lich-su-viet-nam-1.jpg", // Ví dụ ảnh 1
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA4a9_ptU9MFY4y2x9tQ11CNW6BZ5p9BG4HQ&s", // Ví dụ ảnh 2
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Oyz8Kiv4IxNaCyafkQMF1FlXUloSE4DGVQ&s", // Ví dụ ảnh 3
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp1FguSdL-g-AVhUPZ1ejwt2oYD8go6fWIxQ&s", // Ví dụ ảnh 4
    ];

    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <div className="relative">
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-[250px] object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-800/50 to-transparent rounded-lg"></div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ImageSwiper;