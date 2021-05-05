import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAksCt4qgYCa30WSxy-tX8yq39dX9Lj0RI",
  authDomain: "theater-841bd.firebaseapp.com",
  databaseURL: "https://theater-841bd-default-rtdb.firebaseio.com",
  projectId: "theater-841bd",
  storageBucket: "theater-841bd.appspot.com",
  messagingSenderId: "796389253256",
  appId: "1:796389253256:web:32b6d13276c27b49b1ff3d",
  measurementId: "G-J14DSFVW3J"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage= firebase.storage();