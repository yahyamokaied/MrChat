import * as ActoinTypes from './ActoinTypes';

import { auth, database, storage, firebase } from '../../Setup';

import * as AuthStorage from '../../auth/AuthStorage';

import Contacts from 'react-native-contacts';
import { Platform, PermissionsAndroid,Linking } from 'react-native';



export const setUser = user => ({
    type: ActoinTypes.SET_USER,
    payload: { user }
});

export const setUser2 = user2 => ({
    type: ActoinTypes.SET_USER2,
    payload: { user2 }
});

export const getUserData = userData => ({
    type: ActoinTypes.SET_USERDATA,
    payload: { userData }
});

export const setContactsActive = () => ({
    type: ActoinTypes.SET_CONTACTS_ACTIVE
});

export const getUserPhoto = photoURL => ({
    type: ActoinTypes.SET_USERPHOTO,
    payload: { photoURL }
});

export const setStatus = userStatus => ({
    type : ActoinTypes.SET_STATUS,
    payload: { userStatus }
});

export const setLastSeen = userLastSeen => ({
    type : ActoinTypes.SET_LASTSEEN,
    payload: { userLastSeen }
});


export const getContacts = contacts => ({
    type: ActoinTypes.SET_CONTACTS,
    payload: { contacts }
});

export const startLoading = () => ({
    type : ActoinTypes.SET_STARTLOADING
});

export const stopLoading = () => ({
    type : ActoinTypes.SET_STOPLOADING
});

export const signInDone = () => ({
    type : ActoinTypes.SET_SIGNINDONE
});

export const signInError = () => ({
    type : ActoinTypes.SET_SIGNINERROR
});

export const setResult = (confirmResult) => ({
    type : ActoinTypes.SET_RESULT,
    payload: { confirmResult }
});

export const codeConfirmDone = () => ({
    type : ActoinTypes.SET_CODECONFIRMATIONDONE 
});

export const codeConfirmError = () => ({
    type : ActoinTypes.SET_CODECONFIRMATIONERROR
});

export const setFirstTimeStart = () => ({
    type : ActoinTypes.SET_FIRSTTIMESTART
});

export const setFirstTimeStop = () => ({
    type : ActoinTypes.SET_FIRSTTIMESTOP
});

export const setFmcToken = (fcmToken) => ({
    type : ActoinTypes.SET_FCM_TOKEN,
    payload: { fcmToken }
});


//redux thunk

export const signIn = ( phone ) => {
return ( dispatch, getState ) => {
    dispatch(startLoading());

        try {
            auth().signInWithPhoneNumber(phone)
            .then( result => {
                dispatch(setResult(result));
                dispatch(signInDone());
                console.log( "signIn done.");

            })
            .catch(error => {
                dispatch(signInError());
                console.log( "signIn error : ", error );
            });
        } catch (error) {
            console.log( "signIn error : ", error );
        }

            dispatch(stopLoading());
        };
        };


    export const ConfirmCode = ( confirmResult, code ) => {
        return ( dispatch, getState ) => {
            dispatch(startLoading());
        
            confirmResult
            .confirm(code)
            .then(res => {
                dispatch(setUser( res.user ));
                AuthStorage.setToken( res.user );
                dispatch(codeConfirmDone());
                dispatch(setFirstTimeStart());
                console.log( "ConfirmCode done.");
            })
            .catch(error => {
                dispatch(codeConfirmError());
                console.log( "ConfirmCode error : ", error );
              });
              
            dispatch(stopLoading());
        };
        };


        export const signOut = () => {
            return ( dispatch, getState ) => {
                dispatch(startLoading());

            try {
                auth().signOut()
                .then( () => {
                dispatch(setUser(null));
                console.log('User signed out!');
                AuthStorage.removeToken();
                })
                .catch(error => {
                    console.log( "signOut error : ", error );
                });
            } catch (error) {
                console.log( "signOut error : ", error );
            }
      
                dispatch(stopLoading());
            };
            };
            
            export const FetchUserData = () => {
                return ( dispatch, getState ) => {
                    dispatch(startLoading());
                
                try {
                    dispatch( getUserData ( {
                        displayName: auth().currentUser.displayName,
                        email: auth().currentUser.email,
                        uid: auth().currentUser.uid,
                        phoneNumber: auth().currentUser.phoneNumber
                    } ) );
    
                    dispatch( getUserPhoto( auth().currentUser.photoURL )) ;
                    console.log( "getUserData done.", auth().currentUser.photoURL);
                } catch (error) {
                    console.log( "FetchUserData error : ", error);

                }
                    dispatch(stopLoading());
                };
                };

                export const updateDisplayName = ( displayName ) => {
                    return ( dispatch, getState ) => {
                        dispatch(startLoading());

                    try {
                        const update = { displayName: displayName };
                        auth().currentUser.updateProfile(update)
                       .then( console.log( "updateDisplayName done.",displayName) )
                       .catch(error => {
                           console.log( "updateDisplayName error : ", error );
                         });
                         dispatch(  FetchUserData() );
                    } catch (error) {
                        console.log( "updateDisplayName error : ", error );
                    }

                        dispatch(stopLoading());
                    };
                    };

                    export const updateEmail = ( email ) => {
                        return ( dispatch, getState ) => {
                            dispatch(startLoading());
    
                        try {
                            auth().currentUser.updateEmail(email)
                            .then( console.log( "updateEmail done.",email) )
                            .catch(error => {
                                console.log( "updateEmail error : ", error );
                            });
                        } catch (error) {
                            console.log( "updateEmail error : ", error );
                        }
                              
                            dispatch(  FetchUserData() );
                            dispatch(stopLoading());
                        };
                        };


                export const uploadUserPhoto = ( user,image ) => {
                    return ( dispatch, getState ) => {
                        dispatch(startLoading());
                    
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
                          // update profile photo in user firebase
                          const update = { photoURL: DownloadURL };
                          auth().currentUser.updateProfile(update);
                          console.log('user photoURL updated.');
                          dispatch( getUserPhoto( DownloadURL ));
                        })
                        .catch(error => {
                          console.log( "_UploadUserPhoto 1 error : ", error );
                        })
                        })
                        .catch(error => {
                          console.log( "_UploadUserPhoto 2 error : ", error );
                        });

                    console.log( "uploadUserPhoto done.");
                    } catch (error) {
                    console.log( "_UploadUserPhoto error : ", error );

                    }
                        
                        dispatch(stopLoading());
                    };
                    };


                    

    export const setUserStatus = () => {
        return ( dispatch, getState ) => {
    try {
        var uid = auth().currentUser.phoneNumber
        const userStatusRef = database().ref('/status/' + uid);
        const isOfflineForDatabase = {
            state: 'offline',
        };
        const isOnlineForDatabase = {
            state: 'online',
        };
        database().ref('.info/connected').on('value', (snapshot) => {
            if (snapshot.val() == false) {
                return;
            };
            userStatusRef.onDisconnect().set(isOfflineForDatabase)
            .then(() => {
                userStatusRef.set(isOnlineForDatabase);
            })
            .catch(error => {
                console.log( "setUserStatus error : ", error );
            });
        });
        var Status =[];
        database().ref('/status/' + uid ).on('value', (snapshot) => {
        if (snapshot.val() == null )
        {  
        console.log("No Status");
        }
        else {
        snapshot.forEach( (child) => {
            Status.push(child.val());
        });
        dispatch( setStatus( Status[0] ) );
        console.log( "setUserStatus done.", Status[1] );
        }
    });
    } catch (error) {
        console.log('setUserStatus',error)
    }
        };
        };


        export const setUserLastSeen = () => {
            return ( dispatch, getState ) => {
        try {
            var uid = auth().currentUser.phoneNumber
            const userStatusRef = database().ref('/lastseen/' + uid);
            const isOfflineForDatabase = {
                TimeStamp:firebase.database.ServerValue.TIMESTAMP,
            };
            const isOnlineForDatabase = {
                TimeStamp:firebase.database.ServerValue.TIMESTAMP,
            };
            database().ref('.info/connected').on('value', (snapshot) => {
                if (snapshot.val() == false) {
                    return;
                };
                userStatusRef.onDisconnect().set(isOfflineForDatabase)
                .then(() => {
                    userStatusRef.set(isOnlineForDatabase);
                })
                .catch(error => {
                    console.log( "setUserLastSeen error : ", error );
                });
            });
            var Status =[];
            database().ref('/lastseen/' + uid ).on('value', (snapshot) => {
            if (snapshot.val() == null )
            {  
            console.log("No lastseen");
            }
            else {
            snapshot.forEach( (child) => {
                Status.push(child.val());
            });
            dispatch( setStatus( Status[0] ) );
            console.log( "setUserLastSeen done.", Status[1] );
            }
        });
        } catch (error) {
            console.log('setUserLastSeen',error)
        }
            };
            };



export const UploadFCMToken = ( user, token ) => {
    return ( dispatch, getState ) => {
    
        console.log("UploadFCMToken : ",token);
        database().ref(`/users/${user}/fcmToken`)
        .once('value', function (snapshot) {
          //console.log("snapshotttt ",snapshot)
        if (snapshot.hasChildren()) {
        snapshot.forEach(function (child) {
          child.ref.update({fcmToken: token});
        });
      } else {
        snapshot.ref.push({fcmToken: token});
      }
    })
    .then(() =>
    console.log('UploadFCMToken updated'))
    .catch((error) =>  console.log("UploadFCMToken error : ",error) );

    };
    };





    export const FetchContacts = () => {
           return ( dispatch, getState ) => {
                        dispatch(startLoading());
                    
        getList = async () => {
            Contacts.getAll ( async (err, contacts) => {
                if (err === 'denied') {
                    console.log("Cannot access your contacts");
                } else {
                    //console.log(contacts)
                   await _GetContacts(contacts);
                }
            })
        }
    
        if (Platform.OS === 'android')
        {
            PermissionsAndroid.request (
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: 'Contacts',
                    message: ' MrChat would like to access your contacts to see your friends'
                }
            )
            .then(() => {
                getList();
            })
            .catch(error => {
                console.log( "Contacts error : ", error );
                Linking.openURL('app-settings:1');
            });
        }
        else if ( Platform.OS === 'ios' ) 
        {
                getList();
        }
    
    
        const _GetContacts = async (allcontacts) => {
        try {
        var currentContacts = []
        var regex1 = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        //var regex2 = /^[0-0][0-0]?()[0-9](\s|\S)(\d[0-9]{8,16})$/

        allcontacts.forEach( contact => 
        {

            function getNumber (phone)
            {
            if( Object.keys(phone).length > 0 )
            {

            var removedSpaces = contact.phoneNumbers[0].number.split(" ").join("");
            var removedDashes = removedSpaces.split("-").join("");
            if( removedDashes.startsWith('00') == true )
            { var removedDashes=removedDashes.replace('00', "+") } 
            return removedDashes
            }
            else return 0
            }
            
            
        if( Object.keys(contact.phoneNumbers).length > 0 )
        {
        if ( regex1.test( getNumber(contact.phoneNumbers) ) == true )
             currentContacts.push ({
                recordID: contact.recordID,
                givenName: contact.givenName,
                familyName: contact.familyName,
                phoneNumber: getNumber(contact.phoneNumbers)
             })
        }
        }
        );
        function compare( a, b ) {
        if ( a.givenName < b.givenName ){
            return -1;
        }
        if ( a.givenName > b.givenName ){
            return 1;
        }
        if ( a.familyName < b.familyName ){
            return -1;
            }
            if ( a.familyName > b.familyName ){
            return 1;
            }

        return 0;
        }
        currentContacts = currentContacts.sort( compare );
        if(currentContacts == null)
        { dispatch( getContacts(null) ); }

        dispatch( getContacts(currentContacts) );

        }
        catch (error)
        {
        console.log("getContacts error : ",error)
        }
        };

        console.log( "FetchContacts done.");
                        
        dispatch(stopLoading());
    };
    };