import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firebase-firestore'

const Config = {
    apiKey: "AIzaSyB8gVK-PK32CWipaPR6ACStYc-aX3QPL90",
    authDomain: "guimyapp-ef820.firebaseapp.com",
    databaseURL: "https://guimyapp-ef820.firebaseio.com",
    projectId: "guimyapp-ef820",
    storageBucket: "guimyapp-ef820.appspot.com",
    messagingSenderId: "967340234954",
    appId: "1:967340234954:web:9154b7bf47c37a159f3c33",
    measurementId: "G-2V9DQQEGZ2"
}

firebase.initializeApp(Config);

export const { auth } = firebase;
export const firestore = firebase.firestore();
export const database = firebase.database();

export const provider = new firebase.auth.GoogleAuthProvider();
export const providerE = new firebase.auth.EmailAuthProvider();