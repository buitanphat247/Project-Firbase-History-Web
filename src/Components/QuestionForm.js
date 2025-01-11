import React from 'react';
import { Input, Form, Radio } from 'antd';

const QuestionForm = ({ questions, onChange }) => {
    const handleQuestionChange = (index, key, value) => {
        const updatedQuestions = [...questions];
        if (key === 'question') {
            updatedQuestions[index].question = value; // Cập nhật nội dung câu hỏi
        } else if (key.startsWith('answer')) {
            const answerIndex = parseInt(key.split('-')[1], 10);
            updatedQuestions[index].answers[answerIndex] = value; // Cập nhật đáp án
        } else if (key === 'correct') {
            updatedQuestions[index].correct = value; // Cập nhật đáp án đúng
        }
        onChange(updatedQuestions); // Gửi dữ liệu đã cập nhật về parent component
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {questions.map((q, index) => (
                <div key={index} className="question-card">
                    {/* Câu hỏi */}
                    <Form.Item
                        label={`Câu Hỏi ${index + 1}`}
                        required
                        validateStatus={!q.question ? 'error' : ''}
                        help={!q.question ? 'Câu hỏi không được để trống' : ''}
                    >
                        <Input
                            placeholder="Nhập nội dung câu hỏi"
                            value={q.question || ''} // Hiển thị giá trị câu hỏi
                            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                        />
                    </Form.Item>

                    {/* Đáp án */}
                    {q.answers.map((a, i) => (
                        <Form.Item
                            key={`answer-${index}-${i}`}
                            label={`Đáp Án ${i + 1}`}
                            required
                            validateStatus={!a ? 'error' : ''}
                            help={!a ? `Đáp án ${i + 1} không được để trống` : ''}
                        >
                            <Input
                                placeholder={`Nhập đáp án ${i + 1}`}
                                value={a || ''} // Hiển thị giá trị đáp án
                                onChange={(e) =>
                                    handleQuestionChange(index, `answer-${i}`, e.target.value)
                                }
                            />
                        </Form.Item>
                    ))}

                    {/* Đáp án đúng */}
                    <Form.Item
                        label="Chọn đáp án đúng"
                        required
                        validateStatus={q.correct === null ? 'error' : ''}
                        help={q.correct === null ? 'Vui lòng chọn đáp án đúng' : ''}
                    >
                        <Radio.Group
                            value={q.correct} // Hiển thị đáp án đúng đã chọn
                            onChange={(e) => handleQuestionChange(index, 'correct', e.target.value)}
                        >
                            {q.answers.map((_, i) => (
                                <Radio key={i} value={i}>
                                    Đáp Án {i + 1}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                </div>
            ))}
        </div>
    );
};

export default QuestionForm;
