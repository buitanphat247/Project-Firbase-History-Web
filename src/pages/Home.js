import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { Spin, Modal, Button } from "antd";
import HistoricalCharacterCard from "../Components/HistoricalCharacterCard";
import InfoCard from "../Components/InfoCard";
import { NavLink } from "react-router-dom";

const Home = () => {
    const [charactersData, setCharactersData] = useState([]);
    const [placesData, setPlacesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const historicalImages = [
        "https://cdnmedia.baotintuc.vn/Upload/EqV5H9rWgvy9oNikwkHLXA/files/2021/12092021-nhungbucanhdedoicuattxvn-21.jpg",
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2020/5/15/805726/6-1.jpg?w=800&h=496&crop=auto&scale=both",
        "https://static.tuoitre.vn/tto/i/s626//2014/12/03/r8tTjK3V.jpg",
        "https://phunukontum.org.vn/wp-content/uploads/2016/11/nu-vuong-3.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR89THZzQEl0bmx-CWSh15nPEJ_NVjhVcHyN8N1rNKHhDL_A16uN1aW3xvd4dyvOII6Orc&usqp=CAU",
        "https://nhiepanhvietnam.vn/uploads/news/d_20824225317-lich-su-nhiep-anh-viet-nam-1.jpg",
        "https://nhiepanhvietnam.vn/upload/image/kien-thuc-nhiep-anh/lich-su-nhiep-anh-viet-nam-4.jpg",
        "https://cdnmedia.baotintuc.vn/2015/04/28/23/38/160415-Nguoi-dan-Sai-Gon-do-ra-duong-don-quan-giai-phong-1.jpg",
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [charSnapshot, placeSnapshot] = await Promise.all([
                    getDocs(collection(db, "characters")),
                    getDocs(collection(db, "locations")),
                ]);

                const charData = charSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const placeData = placeSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setCharactersData(charData);
                setPlacesData(placeData);
            } catch (error) {
                console.error("Error fetching data from Firestore:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const showModal = (item) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedItem(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" tip="Đang tải dữ liệu..." />
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            {/* Historical Images Swiper */}
            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 1800, // 3 giây
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                breakpoints={{
                    768: { slidesPerView: 3, spaceBetween: 10 },
                    1024: { slidesPerView: 3, spaceBetween: 10 },
                }}
            >
                {historicalImages.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white shadow-md rounded-lg cursor-pointer">
                            <img
                                src={image}
                                alt={`Lịch sử ${index + 1}`}
                                className="w-full h-[250px] object-cover rounded-md"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Characters Swiper */}
            <div className="my-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Nhân Vật Lịch Sử</h2>
                    <NavLink
                        to="./figures"
                        className="text-blue-500 font-semibold hover:underline"
                    >
                        Xem thêm
                    </NavLink>
                </div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 3, spaceBetween: 30 },
                        1024: { slidesPerView: 4, spaceBetween: 10 },
                    }}
                    className="py-5"
                >
                    {charactersData.map((character) => (
                        <SwiperSlide key={character.id}>
                            <div
                                onClick={() => showModal(character)}
                                className="cursor-pointer"
                            >
                                <HistoricalCharacterCard
                                    character={{
                                        name: character.name,
                                        image: character.image,
                                        description: character.desc,
                                    }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Places Swiper */}
            <div className="my-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Địa Điểm Lịch Sử</h2>
                    <NavLink
                        to="./places"
                        className="text-blue-500 font-semibold hover:underline"
                    >
                        Xem thêm
                    </NavLink>
                </div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 1800,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 10 },
                        768: { slidesPerView: 3, spaceBetween: 10 },
                        1024: { slidesPerView: 4, spaceBetween: 10 },
                    }}
                    className="py-5"
                >
                    {placesData.map((place) => (
                        <SwiperSlide key={place.id}>
                            <div
                                onClick={() => showModal(place)}
                                className="cursor-pointer"
                            >
                                <InfoCard
                                    key={place.id}
                                    item={{
                                        name: place.name,
                                        images: [
                                            place.image1,
                                            place.image2,
                                            place.image3,
                                            place.image4,
                                            place.image5,
                                        ],
                                        description: place.desc,
                                        map: place.mapLink,
                                    }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Modal Ant Design */}
            <Modal
                title={selectedItem?.name}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Đóng
                    </Button>,
                ]}
            >
                <div className="flex flex-col items-center">
                    <img
                        src={selectedItem?.image || selectedItem?.image1}
                        alt={selectedItem?.name}
                        className="w-64 h-64 object-cover rounded-full mb-4"
                    />
                    <p className="text-justify">{selectedItem?.desc}</p>
                    {selectedItem?.map && (
                        <a
                            href={selectedItem.map}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline mt-4"
                        >
                            Xem trên bản đồ
                        </a>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default Home;
