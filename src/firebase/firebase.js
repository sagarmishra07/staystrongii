// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// export const IS_DEV = process.env.NODE_ENV === 'development';

const firebaseConfig = {
  apiKey: 'AIzaSyBo8nblRo4XTo_wumf8g2D5dZv85NMwUD8',
  authDomain: 'standstrongii.firebaseapp.com',
  projectId: 'standstrongii',
  storageBucket: 'standstrongii.appspot.com',
  messagingSenderId: '407981451143',
  appId: '1:407981451143:web:1fb306f9d32ca2c59ad522',
  measurementId: 'G-TK5M50LD6C',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireDatabase = getDatabase(app);

export { auth, app, fireDatabase };

//firebase config
