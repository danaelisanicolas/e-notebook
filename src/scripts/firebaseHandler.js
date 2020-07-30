import { firebaseApp } from './utilities'

export const authFirebase = () => firebaseApp.auth()

export const dbFirebase = () => firebaseApp.firestore()

export const loginWithAuth = (email, password) => authFirebase().signInWithEmailAndPassword(email, password)

export const signinWithAuth = (email, password) => authFirebase().createUserWithEmailAndPassword(email, password)

export const getNotesWithUserId = (userId) => dbFirebase().collection('notes').where('uid', '==', userId)

export const deleteNoteWithId = (id) => dbFirebase().collection('notes').doc(id).delete()

export const saveNoteOnUserId = (userid, note) => dbFirebase().collection('notes').add({
  title: note.title,
  content: note.content,
  uid: userid,
})

export const saveExistingNoteOnUserId = (userid, note) => dbFirebase().collection('notes').doc(note.id).set({
  title: note.title,
  content: note.content,
  uid: note.uid
})
