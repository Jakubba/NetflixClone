import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: 'AIzaSyDtH_RrmetUGendZs4KjLUKDtb7oMNR5z0',
  authDomain: 'clone-netflix-a1e44.firebaseapp.com',
  projectId: 'clone-netflix-a1e44',
  storageBucket: 'clone-netflix-a1e44.appspot.com',
  messagingSenderId: '681856242533',
  appId: '1:681856242533:web:d8f5cb5d8a9b8d8e29c78c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    if (user) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name,
        authProvider: 'local',
        email,
      });
    } else {
      throw new Error('Błąd podczas rejestracji użytkownika.');
    }
  } catch (error) {
    console.error(error.message);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('Użytkownik zalogowany pomyślnie.');
  } catch (error) {
    console.error(error.message);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log('Użytkownik wylogowany pomyślnie.');
  } catch (error) {
    console.error('Błąd podczas wylogowywania użytkownika:', error.message);
  }
};

export { auth, db, signUp, login, logout };

// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if false;
//     }
//   }
// }
