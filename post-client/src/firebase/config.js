import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD7oCXMghTAY7qvkqXwlr5e5gXmhy-esDY",
  authDomain: "post-app-6ba0c.firebaseapp.com",
  projectId: "post-app-6ba0c",
  storageBucket: "post-app-6ba0c.appspot.com",
  messagingSenderId: "838269044041",
  appId: "1:838269044041:web:dca3e77b4fd42a15fe0698"
};

firebase.initializeApp(firebaseConfig)

const storageService = firebase.storage()

export { storageService }