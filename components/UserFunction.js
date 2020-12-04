import React,{useContext,useEffect,useState} from 'react';

import {auth,firebase,database,storage} from "../Setup";
import {useSelector, useDispatch} from 'react-redux';
import { getUserPhoto } from '../redux/actions';


/* export const _GetUserPhoto = async (user) => {
    const url = await storage()
    .ref(`/profile/${user}/${user}.png`)
    .getDownloadURL().then(console.log("user photo restored."));
    setProfileImage(url)
} */

export const _SetUserPhoto = async (newphoto) => {
  try {
      const update = { photoURL: newphoto };
      auth().currentUser.updateProfile(update);
      console.log('user photoURL updated.');
  } catch (error) {
      console.log(error);
  }
};

export const _SetUserName = async (newname) => {
try {
        const update = { displayName: newname };
        await auth().currentUser.updateProfile(update);
        console.log('user displayName updated.');
    } catch (error) {
        console.log(error);
    }
};

export const _SetUserEmail = async (newemail) => {
    try {
        auth().currentUser.updateEmail(newemail);
        console.log('user email updated.');
    } catch (error) {
        console.log(error);
    }
};


export const _UploadUserPhoto = (user,image) => {
  console.log('Im hereee')

    try {
        const imgURL = `data:${image.mime};base64,${image.data}`;
        const storageRef = storage().ref(`/profile/${user}/${user}.png`);
      
        const task = storageRef.putString(imgURL, storage.StringFormat.DATA_URL);
        task.on('state_changed',taskSnapshot => {
        console.log(`${taskSnapshot.bytesTransferred} of ${taskSnapshot.totalBytes}`);
        });
        task.then(imageSnapshot => {
          console.log("user Image uploaded to Storage.");
           storage().ref(imageSnapshot.metadata.fullPath).getDownloadURL()
          .then(DownloadURL => { 
          // update user photo in firebase
          _SetUserPhoto (DownloadURL);
          console.log("photooooooo",DownloadURL)
        })
        });
    } catch (error) {
        console.log(error);
    }
};


export const _GetStatus = async (user) => {
try {
  const userStatusRef = database().ref('/status/' + user);
  const isOfflineForDatabase = {
      state: 'offline',
      last_changed: database.ServerValue.TIMESTAMP,
  };
  const isOnlineForDatabase = {
      state: 'online',
      last_changed: database.ServerValue.TIMESTAMP
  };
 await database().ref('.info/connected').on('value', (snapshot) => {
      if (snapshot.val() == false) {
          return;
      };
      userStatusRef.onDisconnect().set(isOfflineForDatabase).then(() => {
          userStatusRef.set(isOnlineForDatabase);
      });
  });
  var Status =[];
  await database().ref('/status/' + user).on('value', (snapshot) => {
   if (snapshot.val() === null ) {  
     console.log("No Status");
   }
   else {
     snapshot.forEach( (child) => {
       Status.push(child.val());
     });
     console.log("status : ",Status[1])
   }
 });
 return Status[1];
} catch (error) {
  console.log(error)
}

};


export const _GetUser2Name = (contacts,user) => {
  try {

    var name = contacts.filter(function (e) {
      return e.phoneNumber == user;
    });

   
    if( name[0] == null )
{
console.log("name is null")
var user2name = user ;
}

else var user2name = name[0].givenName +' '+ name[0].familyName ;

return user2name ;

  }
  catch (error)
  {
    console.log(error)
  }
}
