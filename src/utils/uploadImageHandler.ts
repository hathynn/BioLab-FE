import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../config/firebaseConfig";
import { v4 as uuidv4 } from "uuid";

export const uploadImageToFirebase = async (file: File, url: string) => {
  return new Promise<string>((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject("Chỉ được phép tải lên file hình ảnh!");
      return;
    }

    // Tạo tên file duy nhất bằng timestamp + UUID
    const uniqueFileName = `${Date.now()}-${uuidv4()}-${file.name}`;
    const storageRef = ref(storage, `${url}/${uniqueFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", downloadURL);
        resolve(downloadURL);
      }
    );
  });
};

export const deleteImageFromFirebase = async (imageUrl: string) => {
  try {
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
    console.log("Xóa ảnh thành công:", imageUrl);
  } catch (error) {
    console.error("Lỗi khi xóa ảnh:", error);
  }
};
