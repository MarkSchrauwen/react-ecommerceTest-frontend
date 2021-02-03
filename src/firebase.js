import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC9Px9ujqNHAGJmeEy68FpQhI1xWhMawhk",
    authDomain: "ecommerce-426c7.firebaseapp.com",
    projectId: "ecommerce-426c7",
    storageBucket: "ecommerce-426c7.appspot.com",
    messagingSenderId: "410397091781",
    appId: "1:410397091781:web:3ac6d0e18022b930d88dac"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();