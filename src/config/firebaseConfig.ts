import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDvfxieOFq3yUM4iiTYTIGXMqKja7KVheI",
    authDomain: "daihoicongdoanvienchuc-48718.firebaseapp.com",
    databaseURL: "https://daihoicongdoanvienchuc-48718-default-rtdb.firebaseio.com",
    projectId: "daihoicongdoanvienchuc-48718",
    storageBucket: "daihoicongdoanvienchuc-48718.appspot.com",
    messagingSenderId: "983602819778",
    appId: "1:983602819778:web:756a25c09c7914d6ba815b",
    measurementId: "G-325Z9PX1MN"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
