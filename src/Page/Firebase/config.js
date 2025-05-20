import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database'; //rlt db

const firebaseConfig = {
  apiKey: "AIzaSyCmFioNShG0RuatCPUmGRe-Y-DEVm75ebU",
  authDomain: "realtimevehicle-c14f0.firebaseapp.com",
  databaseURL: "https://realtimevehicle-c14f0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "realtimevehicle-c14f0",
  storageBucket: "realtimevehicle-c14f0.firebasestorage.app",
  messagingSenderId: "529612828969",
  appId: "1:529612828969:web:aedf46fe0d242a31930738",
  measurementId: "G-LPJGZPBF1L"
};

// Inisialisasi Firebase hanya sekali
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
}

// ✅ Inisialisasi Auth dan Database
export const FirebaseAuth = getAuth();
export const FirebaseDatabase = getDatabase(firebaseApp); // <-- ini yang penting

// ✅ Fungsi otentikasi
export const SignUp = async (email, password) => {
  await createUserWithEmailAndPassword(FirebaseAuth, email, password);
};

export const SignIn = async (email, password) => {
  await signInWithEmailAndPassword(FirebaseAuth, email, password);
};

export const SignOut = async () => {
  await signOut(FirebaseAuth);
};

// (Opsional) Untuk handling error kode dari auth
export const GetSignInErrorMessage = (code) => {
  switch (code) {
    case 'auth/user-not-found':
      return 'User tidak ditemukan.';
    case 'auth/wrong-password':
      return 'Password salah.';
    case 'auth/email-already-in-use':
      return 'Email sudah digunakan.';
    default:
      return 'Terjadi kesalahan saat login.';
  }
};