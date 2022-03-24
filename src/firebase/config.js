import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
};

firebase.initializeApp(firebaseConfig);
