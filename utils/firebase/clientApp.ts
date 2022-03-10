import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getAuth } from 'firebase/auth';
import { collection, getDoc } from 'firebase/firestore';
import {
  uploadBytes,
  uploadBytesResumable,
  UploadTask,
  UploadTaskSnapshot,
} from 'firebase/storage';
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firebaseApp = firebase.app();
const firebaseAuth = firebase.auth();
const firebaseDb = firebase.firestore();
const firebaseNow = firebase.firestore.Timestamp.now();
const firebaseStorage = firebase.storage();
const hookAuth = getAuth(firebaseApp);
export {
  firebaseApp,
  firebaseAuth,
  firebaseDb,
  firebaseNow,
  firebaseStorage,
  hookAuth,
  collection,
  getDoc,
  uploadBytes,
  uploadBytesResumable,
};
console.log(
  firebaseApp.name ? 'Firebase Mode Activated!' : 'Firebase not working :(',
);
