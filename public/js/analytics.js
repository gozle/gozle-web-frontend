// Import the functions you need from the SDKs you need
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAnggzkZfpkij4V6ADyJn9OtjJYE4pDv9k',
  authDomain: 'gozle-web.firebaseapp.com',
  projectId: 'gozle-web',
  storageBucket: 'gozle-web.appspot.com',
  messagingSenderId: '477827001487',
  appId: '1:477827001487:web:ebd704009b1550767b14fa',
  measurementId: 'G-QBGLQ1N542',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
