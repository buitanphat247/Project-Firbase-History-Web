import { collection, doc, setDoc, serverTimestamp, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Hàm dùng để thêm dữ liệu vào Firestore, kèm theo ngày giờ cập nhật
 * @param {string} collectionName - Tên collection trong Firestore
 * @param {object} data - Dữ liệu cần thêm
 * @returns {Promise<void>} - Promise khi hoàn thành
 */
export const addDocument = async (collectionName, data) => {
    try {
        // Tạo một document mới với ID tự động
        const newDocRef = doc(collection(db, collectionName));

        // Thêm dữ liệu cùng với timestamp
        await setDoc(newDocRef, {
            ...data, // Sao chép dữ liệu đầu vào
            createdAt: serverTimestamp(), // Thời gian tạo
            updatedAt: serverTimestamp(), // Thời gian cập nhật
        });

        console.log(`Dữ liệu đã được thêm vào collection "${collectionName}":`, data);
    } catch (error) {
        console.error("Lỗi khi thêm dữ liệu:", error);
    }
};


export const deleteDocument = async (collectionName, documentId) => {
    try {
        const docRef = doc(db, collectionName, documentId); // Tạo tham chiếu tới document
        await deleteDoc(docRef); // Xóa document
        console.log(`Dữ liệu đã được xóa khỏi collection "${collectionName}" với ID: ${documentId}`);
    } catch (error) {
        console.error("Lỗi khi xóa dữ liệu:", error);
    }
};

export const updateDocument = async (collectionName, documentId, updatedData) => {
    try {
        // Tham chiếu đến tài liệu cụ thể
        const documentRef = doc(db, collectionName, documentId);

        // Cập nhật dữ liệu
        await updateDoc(documentRef, updatedData);

        console.log(`Tài liệu trong collection "${collectionName}" với ID "${documentId}" đã được cập nhật.`);
    } catch (error) {
        console.error('Lỗi khi cập nhật dữ liệu:', error);
    }
};