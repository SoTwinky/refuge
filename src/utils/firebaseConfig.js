import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBve3uoDWX8U9xQJr6FrCjlDT-tzPlhTEA",
    authDomain: "react-auth-ff67e.firebaseapp.com",
    projectId: "react-auth-ff67e",
    storageBucket: "react-auth-ff67e.appspot.com",
    messagingSenderId: "362604509575",
    appId: "1:362604509575:web:df0bcc78ef86aec654fb22"
};

firebase.initializeApp(firebaseConfig);

export default firebase;