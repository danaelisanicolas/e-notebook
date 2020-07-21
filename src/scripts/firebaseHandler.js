import { auth } from "firebase"

export const authStateChange = () => auth().onAuthStateChanged()

export const loginWithAuth = (email, password) => auth().signInWithEmailAndPassword(email, password)

export const signinWithAuth = (email, password) => auth.createUserWithEmailAndPassword(email, password)



export const dbHandler = (db) => {
  // db.collection('notes').doc(auth.user.uid).get().then(doc => {
  //   console.log(doc.data())z
  // })
}