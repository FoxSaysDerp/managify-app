import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
   apiKey: process.env.API_KEY,
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

export { projectFirestore, projectAuth, timestamp };
