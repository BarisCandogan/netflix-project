import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCTGpFWN2VDDH1nkIA0FOhD_wJt5liRhD4',
  authDomain: 'netflix-project-ab9fc.firebaseapp.com',
  projectId: 'netflix-project-ab9fc',
  storageBucket: 'netflix-project-ab9fc.appspot.com',
  messagingSenderId: '512076137756',
  appId: '1:512076137756:web:08d4e1b6ce8dd8d06c66d9',
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }
