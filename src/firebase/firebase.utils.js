import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCpWha7M2kaG7z5FUtFndzP3jYl1Iglrt0",
  authDomain: "crwn-db-5b31a.firebaseapp.com",
  projectId: "crwn-db-5b31a",
  storageBucket: "crwn-db-5b31a.appspot.com",
  messagingSenderId: "53297092397",
  appId: "1:53297092397:web:6b8e9939c0531a71cb25a4",
  measurementId: "G-3Q70DB31KT",
};

firebase.initializeApp(config);
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
