import * as ActoinTypes from './ActoinTypes';
import { Vibration,Alert } from 'react-native';

import { database, firebase } from '../../Setup';

export const startLoading1 = () => ({
    type : ActoinTypes.SET_STARTLOADING
  });

export const stopLoading1 = () => ({
    type : ActoinTypes.SET_STOPLOADING
  });

  export const setBlockedUsers = blockedUsers => ({
    type : ActoinTypes.SET_BLOCKED_USERS,
    payload: { blockedUsers }
  });

export const setConversationsLength = conversationsLength => ({
  type : ActoinTypes.SET_CONVERSATIONS_LENGTH,
  payload: { conversationsLength }
});

export const setAllConversations = allConversations => ({
  type : ActoinTypes.SET_CONVERSATIONS,
  payload: { allConversations }
});

export const setChatLength = chatLength => ({
  type : ActoinTypes.SET_CHAT_LENGTH,
  payload: { chatLength }
});

export const setAllChat = allChat => ({
  type : ActoinTypes.SET_CHAT,
  payload: { allChat }
});

export const setAllVibes = vibesLength => ({
  type : ActoinTypes.SET_VIBES_LENGTH,
  payload: { vibesLength }
});

//redux thunk

export const getContactName = ( contacts,contact ) => {
  return ( dispatch, getState ) => {


try {
  var name = contacts.filter(function (e) {
    return e.phoneNumber == contact;
  });
console.log("nameeeeee", name)


  if( name[0] == null )
{
console.log("name is null")
var ContactName = contact.phoneNumber ;
}

else var ContactName = name[0].givenName +' '+ name[0].familyName ;

return ContactName ;
} catch (error) {
  console.log(error)
}


};
};


export const getConversations = ( contacts, user ) => {
  return ( dispatch, getState ) => {
      dispatch(startLoading1());

try {

  database().ref(`/chat/${user}`)
  .orderByChild("TimeStamp")
  .on('value', (snapshot) => {
if (snapshot.val() === null )
{  
    console.log("No Chats");
    dispatch( setConversationsLength ( 0 ) );
}
else
{
  var Conversations =[];

      snapshot.forEach( (child) => {

        if ( child.key === '+46730000000' )  
              Conversations.push ({
              key: child.key,
              phoneNumber: child.key,
              name: 'Support & Feedback',
            })
        else if (
          dispatch ( getContactName ( contacts,child.key ) ) == null )  
              Conversations.push ({
              key: child.key,
              phoneNumber: child.key,
              name: child.key,
            })
         else
              Conversations.push({
              key: child.key,
              phoneNumber: child.key,
              name: dispatch ( getContactName ( contacts,child.key ) ),
              })
         });
              dispatch( setConversationsLength ( Conversations.length ) );
              dispatch( setAllConversations ( Conversations ) );
         }
         });
        }
        catch (error) {
          console.log(error);
        }
        
        dispatch(stopLoading1());
        };
        };


export const getChat = ( user, user2 ) => {
  return ( dispatch, getState ) => {
    dispatch(startLoading1());

    try {
      database().ref(`/chat/${user}/${user2}`)
      .orderByChild("TimeStamp")
      .on('value', (snapshot) => {
      if (snapshot.val() == null ) {  
        console.log("empty data");
        dispatch( setChatLength ( 0 ) );
      }
      else {
        var CHATS =[];
        snapshot.forEach( (child) => {
        CHATS.push({
        key:child.key,
        Sender: child.val().Sender,
        Receiver: child.val().Receiver,
        ReceiverName: child.val().ReceiverName,
        Message: child.val().Message,
        TimeStamp: child.val().TimeStamp,
        })
        });
        var NEWCHATS = CHATS.reverse();
        dispatch( setChatLength ( CHATS.length ) );
        dispatch( setAllChat ( NEWCHATS ) );
      }
      });
    } catch (error) {
      console.log(error);
    }
    
    dispatch(stopLoading1());

    };
    };


    export const getBlockedUsers = ( user ) => {
      return ( dispatch, getState ) => {
        dispatch(startLoading1());
    
        try {
          database().ref(`/blocked/${user}`)
          .on('value', (snapshot) => {
          if (snapshot.val() == null ) {  
            console.log("empty data");
            dispatch( setBlockedUsers ( '' ) );
          }
          else {
            var BLOCKED =[];
            snapshot.forEach( (child) => {
              BLOCKED.push(child.val())
            });
            dispatch( setBlockedUsers (BLOCKED) );
            console.log('BLOCKED users',BLOCKED);
          }
          });
        } catch (error) {
          console.log('fetch blocked users error',error);
        }
        dispatch(stopLoading1());
    
        };
        };



        export const addBlockedUser = ( user,user2 ) => {
          return ( dispatch, getState ) => {
            database().ref(`/blocked/${user}/`)
            .push (user2)
            .then(console.log ( 'You blocked :'+ user2 ) )
            .catch((error) =>  console.log ("addBlockedUser error : ",error) );
            };
            };




            export const unBlockedUser = ( user,user2 ) => {
              return ( dispatch, getState ) => {

          try {
            
            database().ref(`/blocked/${user}`)
            .on('value', (snapshot) => {
            if (snapshot.val() == null ) {  
              console.log("empty data");
            }
            else {
              var BLOCKED =[];
              snapshot.forEach( (child) => {
                BLOCKED.push(
                  {key:child.key, value:child.val()}
                )
              });
              console.log('all BLOCKED users',BLOCKED);

              function search(nameKey, myArray) {
                for (var i=0; i < myArray.length; i++) {
                    if (myArray[i].value == nameKey) {
                        return myArray[i];
                    }
                }
            };

            var resultObject = search(user2, BLOCKED);
            console.log('all BLOCKED resultObject',resultObject);

            const removeBU = async () => {
             await database()
            .ref(`/blocked/${user}/${resultObject.key}`)
            .remove();
            };

            removeBU();
            
            }
            });

          }
          catch (error)
          {
           console.log('error unBlockedUser') 
          }


                };
                };



    export const sendMessage = (  uid, user, displayName, user2, user2name, Message  ) => {
      return ( dispatch, getState ) => {

        database().ref(`/chat/${user2}/${user}`)
        .push({
          SenderId:uid,
          Sender:user,
          SenderName: displayName,
          Receiver:user2,
          ReceiverName:user2name,
          Message:Message,
          TimeStamp:firebase.database.ServerValue.TIMESTAMP,
        })
        .then(() =>
        console.log('Message Sent to user2.'))
        .catch((error) =>  console.log("sendMessage1 ",error) );


        database().ref(`/all/${user2}/allconversations/${user}`)
        .once('value', function (snapshot) {
          console.log("snapshotttt ",snapshot)
        if (snapshot.hasChildren()) {
        snapshot.forEach(function (child) {
          child.ref.update({
            SenderId:uid,
            Sender:user,
            SenderName: displayName,
            Receiver:user2,
            ReceiverName:user2name,
            Message:Message,
            TimeStamp:firebase.database.ServerValue.TIMESTAMP,
          });
        });
      } else {
        snapshot.ref.push({
          SenderId:uid,
          Sender:user,
          SenderName: displayName,
          Receiver:user2,
          ReceiverName:user2name,
          Message:Message,
          TimeStamp:firebase.database.ServerValue.TIMESTAMP,
        });
      }
    })
    .then(() =>
    console.log('Las Message in allconversations updated'))
    .catch((error) =>  console.log("sendMessage to allconversations ",error) );


        database().ref(`/chat/${user}/${user2}`)
        .push({
          SenderId:uid,
          Sender:user,
          SenderName: displayName,
          Receiver:user2,
          ReceiverName:user2name,
          Message:Message,
          TimeStamp:firebase.database.ServerValue.TIMESTAMP,
        })
        .then(() =>
        console.log('Message Sent to user.'))
        .catch((error) =>  console.log ("sendMessage2 error : ",error) );

        };
        };

        export const sendVibes = ( user ,user2 ) => {
          return ( dispatch, getState ) => {
        
            database().ref(`/vibe/${user2}/`)
            .push ({
              TimeStamp:firebase.database.ServerValue.TIMESTAMP,
              Sender: user
            })
            .then(console.log ( 'You sent Viberate to :'+ user2 ) )
            .catch((error) =>  console.log ("sendVibes error : ",error) );

            };
            };

            export const getVibes = ( user, vibes ) => {
              return ( dispatch, getState ) => {
                dispatch(startLoading1());
            
            try {
              database().ref(`/vibe/${user}/`)
              .on('value', (snapshot) => {
              var VIBES =[];
              snapshot.forEach( (child) => {
              VIBES.push({
                  TimeStamp: child.val().TimeStamp,
                  Sender: child.val().Sender
                })
              });
              console.log("Vibes recived length : ",VIBES.length)
              if( vibes < VIBES.length )
              {
                dispatch( setAllVibes ( VIBES.length ) );
                Vibration.vibrate([18,444,120,300,123]);
                console.log ("getVibes done.")
                dispatch( setAllVibes ( 0 ) );

              }        
              });
            } catch (error) {
              console.log ("getVibes error : ",error)
            }
    
            dispatch(stopLoading1());

                };
                };