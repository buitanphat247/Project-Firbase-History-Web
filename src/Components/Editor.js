import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const Editor = ({ setEditorContent, content }) => {
    const { quill, quillRef } = useQuill();

    // Set initial content when the editor is mounted
    useEffect(() => {
        if (quill) {
            if (content) {
                quill.root.innerHTML = content;  // Set initial content if available
            }

            // On text change, update the local state and call setEditorContent to update parent
            quill.on("text-change", () => {
                const editorHtml = quill.root.innerHTML;
                setEditorContent(editorHtml); // Update content in parent
            });
        }
    }, [quill, content, setEditorContent]);

    return (
        <div
            ref={quillRef}
            style={{
                minWidth: "100%",  // Đặt chiều rộng tối thiểu là 100%
                minHeight: "200px", // Đặt chiều cao tối thiểu là 200px
                border: "1px solid #ccc", // Tạo viền cho editor để dễ nhận diện
                padding: "10px" // Thêm padding cho editor
            }}
        />
    );
};

export default Editor;
