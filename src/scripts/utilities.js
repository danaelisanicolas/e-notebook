import { dbHandler }  from './firebaseHandler'

// load firebase
var firebase = require('firebase')
require('firebase/firebase-auth')
require('firebase/firebase-firestore')
//add analytics and hosting later on

var app = firebase.initializeApp({
  apiKey: "AIzaSyDrukAvEZcku06KMJHFo0R8VgAc3mR_4xo",
  authDomain: "e-notebook-d52c3.firebaseapp.com",
  databaseURL: "https://e-notebook-d52c3.firebaseio.com",
  projectId: "e-notebook-d52c3",
  storageBucket: "e-notebook-d52c3.appspot.com",
  messagingSenderId: "427244786677",
  appId: "1:427244786677:web:41200dd40e6dcdeb1846bc",
  measurementId: "G-N5C1BBWLGJ"
})

const db = firebase.firestore()