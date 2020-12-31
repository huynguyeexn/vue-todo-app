import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCiVQ46ZMCl5LAWGYDMynn_mWkaXSQai-g",
  authDomain: "my-notes-89083.firebaseapp.com",
  projectId: "my-notes-89083",
  storageBucket: "my-notes-89083.appspot.com",
  messagingSenderId: "797001116746",
  appId: "1:797001116746:web:fd930c4ce676b753058ab3"
};

export const db = firebase.initializeApp(firebaseConfig).database();
