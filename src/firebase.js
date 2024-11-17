import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyANHXdobDK5ZKk3lT2cCsCa6FBKmmVX93c",
    authDomain: "intrapology-hello-world.firebaseapp.com",
    databaseURL: "https://intrapology-hello-world-default-rtdb.firebaseio.com",
    projectId: "intrapology-hello-world",
    storageBucket: "intrapology-hello-world.appspot.com",
    messagingSenderId: "514933524839",
    appId: "1:514933524839:web:339e03831f4307426487c2"
};
firebase.initializeApp(config);
export default firebase;
