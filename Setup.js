import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyABK-sC3NzxSu8Pfsg_fw5JC2TdTFc51yc",
  authDomain: "mrchat-ad947.firebaseapp.com",
  databaseURL: "https://mrchat-ad947.firebaseio.com",
  projectId: "mrchat-ad947",
  storageBucket: "mrchat-ad947.appspot.com",
  messagingSenderId: "156039827256",
  appId: "1:156039827256:web:d592138a219247724cbbcd",
  measurementId: "G-PQQ3VS5B0E"
  };

  // Initialize Firebase
  if(!firebase.apps.length)
{
  firebase.initializeApp(firebaseConfig);
}

export { firebase, auth, database, storage };