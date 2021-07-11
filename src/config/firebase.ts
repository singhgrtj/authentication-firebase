import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCb7RwpNKVNO9eFPPhEa-HYtGpWs0fCB_k",
    authDomain: "authentication-firebase-4fba4.firebaseapp.com",
    projectId: "authentication-firebase-4fba4",
    storageBucket: "authentication-firebase-4fba4.appspot.com",
    messagingSenderId: "749580297618",
    appId: "1:749580297618:web:02c53713c779fd16bc0d4b",
    measurementId: "G-83L65C02WH"
};

const Firebase = firebase.initializeApp(firebaseConfig);

export const auth = Firebase.auth();
export default Firebase;