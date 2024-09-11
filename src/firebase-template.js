// rename this file to firebase.js and fill in the correct values

import firebase from 'firebase'
const config = {
    apiKey: "YOUR DATA HERE",
    authDomain: "YOUR DATA HERE",
    databaseURL: "YOUR DATA HERE",
    projectId: "YOUR DATA HERE",
    storageBucket: "YOUR DATA HERE",
    messagingSenderId: "YOUR DATA HERE"
};
firebase.initializeApp(config);
export default firebase;
