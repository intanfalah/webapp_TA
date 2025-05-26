import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyANJQvXZ3J0eIVF0ZCVK6uuHyWMk4Os2CQ",
  authDomain: "traffic-vision-d32aa.firebaseapp.com",
  databaseURL: "https://traffic-vision-d32aa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "traffic-vision-d32aa",
  storageBucket: "traffic-vision-d32aa.firebasestorage.app",
  messagingSenderId: "352122732877",
  appId: "1:352122732877:web:0ea7534b69d59141b83704",
  measurementId: "G-TMD02L1QHD"
};

// Inisialisasi Firebase hanya sekali
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
}

// ✅ Inisialisasi Auth dan Database
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