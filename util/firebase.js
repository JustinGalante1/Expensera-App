//firebase
import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyApGANbHIhs4wryjPyCUXXQwJgspRRlZLY",
  authDomain: "expensera.firebaseapp.com",
  databaseURL: "https://expensera.firebaseio.com",
  projectId: "expensera",
  storageBucket: "expensera.appspot.com",
  messagingSenderId: "83989428686",
  appId: "1:83989428686:web:61b7df23eebc5098f3139f",
  measurementId: "G-FLXMQPZRD9"
};

if(firebase.apps.length == 0){
  firebase.initializeApp(firebaseConfig);
}

export { firebase };