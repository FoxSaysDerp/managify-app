import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
   apiKey: process.env.REACT_APP_FIREBASE_API,
   authDomain: 'managify-389f8.firebaseapp.com',
   projectId: 'managify-389f8',
   storageBucket: 'managify-389f8.appspot.com',
   messagingSenderId: '838086409515',
   appId: '1:838086409515:web:337720a4d254fcb1bf596e',
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;
const projectStorage = firebase.storage();

export { projectFirestore, projectAuth, projectStorage, timestamp };
