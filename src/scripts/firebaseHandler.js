import { auth, firestore } from "firebase"
import { firebaseApp } from './utilities'

export const authFirebase = () => firebaseApp.auth()

export const dbFirebase = () => firebaseApp.firestore()

export const loginWithAuth = (email, password) => auth().signInWithEmailAndPassword(email, password)

export const signinWithAuth = (email, password) => auth().createUserWithEmailAndPassword(email, password)

export const getNotesWithUserId = (userId) => dbFirebase().collection('notes').where('uid', '==', userId)