import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-700">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-extrabold text-center mb-8 text-purple-600">Về Chúng Tôi</h1>
                <p className="leading-relaxed text-lg mb-6 text-gray-900">
                    Chào mừng bạn đến với trang web của chúng tôi! Đây là không gian để chia sẻ và khám phá những câu chuyện lịch sử thú vị, những sự kiện quan trọng, và những nhân vật vĩ đại đã định hình thế giới như chúng ta biết ngày nay. Với mục tiêu mang lịch sử đến gần hơn với mọi người, chúng tôi cung cấp nội dung phong phú, đa dạng và dễ tiếp cận.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h2 className="text-2xl font-bold text-purple-500 mb-4">Tầm Nhìn Của Chúng Tôi</h2>
                        <p className="leading-relaxed text-gray-800">
                            Chúng tôi hướng đến việc xây dựng một cộng đồng nơi mọi người có thể học hỏi và trao đổi kiến thức về lịch sử, giúp nâng cao hiểu biết và tạo cảm hứng để khám phá thêm về quá khứ. Lịch sử không chỉ là những câu chuyện đã qua, mà còn là nguồn cảm hứng cho tương lai.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-purple-500 mb-4">Giá Trị Cốt Lõi</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-800">
                            <li>Tôn trọng sự thật và chính xác trong từng nội dung.</li>
                            <li>Cộng đồng học tập và chia sẻ tri thức.</li>
                            <li>Đưa lịch sử trở nên gần gũi và sống động hơn.</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-purple-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-purple-600 mb-4">Sứ Mệnh Của Chúng Tôi</h2>
                    <p className="leading-relaxed text-lg text-gray-900">
                        Sứ mệnh của chúng tôi là kết nối mọi người với lịch sử thông qua những câu chuyện chân thực, những bài học quý giá, và cách trình bày sáng tạo. Chúng tôi tin rằng hiểu biết về lịch sử giúp chúng ta đánh giá cao hơn những giá trị văn hóa, xã hội, và con người.
                    </p>
                </div>

                <footer className="mt-12 text-center">
                    <p className="text-sm text-gray-600">&copy; 2025 Lịch Sử Thế Giới. Tất cả các quyền được bảo lưu.</p>
                </footer>
            </div>
        </div>
    );
};

export default About;
