import firebase from "firebase/app"; 
import "firebase/firestore"; 

var firebaseConfig = {
    apiKey: "AIzaSyDOOsYFEhFZW7hbE9wdB6Ijl3xLyQGB8b4",
    authDomain: "recipe-ninja-78681.firebaseapp.com",
    databaseURL: "https://recipe-ninja-78681.firebaseio.com",
    projectId: "recipe-ninja-78681",
    storageBucket: "recipe-ninja-78681.appspot.com",
    messagingSenderId: "498352655940",
    appId: "1:498352655940:web:3fb410e64302c678f93611"
  };
  // Initialize Firebase
 var firebaseApp = firebase.initializeApp(firebaseConfig);

 export default firebaseApp.firestore(); 
