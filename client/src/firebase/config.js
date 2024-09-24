// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FB_API_KEY,
  authDomain: import.meta.env.FB_AUTH_DOMAIN,
  projectId: import.meta.env.FB_PROJECT_ID,
  storageBucket: import.meta.env.FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.FB_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// Upload single file
export async function uploadFile(file) {
  const storageRef = ref(storage, "users/" + Date.now() + "booking-file-child");
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

// Upload multiple files
export async function uploadFiles(files) {
  let urls = [];

  for (let i = 0; i < files.length; i++) {
    const storageRef = ref(
      storage,
      "hotels/" + Date.now() + "booking-file-child" + `${files[i].name}`
    );
    await uploadBytes(storageRef, files[i]);
    urls.push(await getDownloadURL(storageRef));
  }

  return urls;
}

// Delete single file
export async function deleteFile(file) {
  const userRef = ref(storage, file);
  await deleteObject(userRef, file);
}

// Delete multiple files
export async function deleteFiles(files) {
  if (files.length <= 1) {
    return;
  } else {
    for (let i = 0; i < files.length; i++) {
      const hotelRef = ref(storage, files[i]);
      await deleteObject(hotelRef, files[i]);
    }
  }
}
