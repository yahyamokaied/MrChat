import React,{ useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Animated, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { database, storage } from '../Setup';
import * as AppColor from './AppColor';
import * as AppText from './AppText';
import * as AppStyle from './AppStyle';
import Icons from './Icons';
import Icon from 'react-native-vector-icons/Ionicons';
import TimeStampToDate from './TimeStampToDate';

import { useNavigation } from '@react-navigation/native';


import { useSelector, useDispatch}  from 'react-redux';
import { addBlockedUser,sendMessage,setChatLength,setUser2, unBlockedUser, startLoading1,stopLoading1,getBlockedUsers } from '../redux/actions';

import FastImage from 'react-native-fast-image';


const UserItem = ({name,status,lastseen,photo,onPress}) => {

  const navigation = useNavigation();

  const [usrStatus,setUsrStatus] = useState(null);
  const [usrLastSeen,setUsrLastSeen] = useState(null);
  const [usrLastSeenTime,setUsrLastSeenTime] = useState(null);
  const [usrImage,setUsrImage] = useState(null);

  const dispatch = useDispatch();

  const userData = useSelector(state => state.auth.userData);
  const chatLength = useSelector(state => state.chat.chatLength);
  const blockedUsers = useSelector(state => state.chat.blockedUsers);

  useEffect(() => {
    try {
      dispatch ( getBlockedUsers ( userData.phoneNumber ) );
    }
    catch (error)
    {
      console.log('getBlockedUsers error',error);
    }
    },[]);



const _GetUserStatus = (user) => {
  try {
    database().ref('/status/' + user).on('value', (snapshot) => {
      if (!snapshot.val())
      {
        console.log('_GetUserStatus empty')
        setUsrStatus('offline')
      }
        snapshot.forEach( (child) => {
          setUsrStatus(child.val());
          console.log("usrStatus:",usrStatus );
        });
      });
  }
  catch (error)
  {
    console.log('_GetUserStatus error',error)
    setUsrStatus('offline')
  }

};


const _GetUserLastSeen = (user) => {

  try {
    database().ref('/lastseen/' + user).on('value', (snapshot) => {
      if (!snapshot.val())
        { 
          console.log('_GetUserStatus empty')
          setUsrLastSeen(null)
        }
        snapshot.forEach( (child) => {
          var currentDate = TimeStampToDate(child.val()).substring(0,10) || null;
          setUsrLastSeen(currentDate);
          var currentTime = TimeStampToDate(child.val()).substring(12,20) || null;
          setUsrLastSeenTime(currentTime);
          console.log("usrLastSeen:",usrLastSeen );
        });
      });
  }
  catch (error)
  {
    console.log('_GetUserStatus error',error);
    setUsrLastSeen(null);
  }

};


const _GetUserPhoto = async (user) => {
  
  try {
    const url = await storage()
    .ref(`/profile/${user}/${user}.png`)
    .getDownloadURL().then(console.log("user photo restored."));
    console.log('usrImage:',url)
    setUsrImage(url);
    }
    catch (error)
    {
      console.log('_GetUserPhoto error',error)
      const defultUrl = "profile50.png";
      setUsrImage(defultUrl);
    }

}

useEffect( () => {
_GetUserStatus(status);
_GetUserPhoto(photo);
_GetUserLastSeen(lastseen);
},[]);




const blockUser = () => {
  Alert.alert (
      "Block user",
      "you will no longer be able to call or send messages to each other",
      [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Block", onPress: () =>
        { 
          dispatch( addBlockedUser(userData.phoneNumber, status) );
          Alert.alert("User Blocked");
        }
      }
      ],
      { cancelable: false }
  );
};


const reportUser = () => {
  Alert.alert (
      "Report & Block",
      "Report & Block user and get support",
      [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Report & Block", onPress: () =>
        { 
          reportUSR();
        }
      }
      ],
      { cancelable: false }
  );
};


const unblockUser = () => {
  Alert.alert (
    "Unblock",
    "you can contact each other again.",
    [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "Unblock", onPress: () =>
      { 
        unblockUSR();
        Alert.alert("User Unblocked");
      }
    }
    ],
    { cancelable: false }
);
};


const unblockUSR = () => {
dispatch( unBlockedUser(userData.phoneNumber,status) );
};



const reportUSR = async () => {
  dispatch( startLoading1 () );
    var urlA=[];
    try {
      urlA=[];
      var url = await storage()
      .ref(`/profile/+46730000000/+46730000000.png`)
      .getDownloadURL().then(console.log("user photo restored."));
      console.log('usr2Image:',url);
      urlA.push(url);
    }
    catch (error)
    {
      console.log('error usr2 from storage',error)
      urlA.push("profile50.png");
    }

    SendMessages ( userData.uid, userData.phoneNumber, userData.displayName, '+46730000000', "Support & Feedback", 
    `I would like report this number :${status}`
    )

    SendMessages ( userData.uid, '+46730000000', "Support & Feedback", userData.phoneNumber, userData.displayName, 
    'we apologize for inconveniences,\n will reply within 24 hours \n can you descripe the problem :'
    )

    dispatch( setUser2 ({
      phoneNumber : "+46730000000",
      userName : "Support & Feedback",
      photoURL : urlA[0]
    }))

  dispatch( addBlockedUser(userData.phoneNumber, status) );

  dispatch( stopLoading1 () );
  navigation.push("Chat");

};



const SendMessages = ( uid, user, displayName, user2, user2name, Message ) => {
  dispatch ( sendMessage (uid, user, displayName, user2, user2name, Message ) );
  dispatch ( setChatLength ( chatLength + 1 ) );
}; 



const deleteChat = () => {
  Alert.alert (
      "Delete Chat",
      "This conversation will no longer available anymore",
      [
      {
        text: "Cancel",
        onPress: () => 
        console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Delete Chat", onPress: async () =>
        { 
              await database()
              .ref(`/chat/${userData.phoneNumber}/${status}`)
              .remove()
              .catch((error) =>  console.log ("deleteChat error : ",error) );
        }
      }
      ],
      { cancelable: false }
  );
};







const swipeLeft = (progress, dragX) => {

  const scale = dragX.interpolate({
    inputRange: [0,100],
    outputRange: [0,1],
    extrapolate: 'clamp',
  });

return (
    <View style={styles.swipeLeft}>
        <Animated.View style={[swipeLeft,{ transform: [{scale: scale}] }]} />

    { status === '+46730000000' ? 
        <><AppText.SBoldText>7/24</AppText.SBoldText></>
        :
        <>
        <Icon name="trash" style={styles.icon} onPress={() => deleteChat() } />

          {
            blockedUsers.includes(status) == true ?
            <Icon name="person-add" style={styles.icon} onPress={() => unblockUser() } />
          :
            <Icon name="person-remove" style={styles.icon} onPress={() => blockUser() } />
          }

        <Icon name="warning" style={styles.icon1} onPress={() => reportUser() } />
    </>
    }

    </View>
);
};




return (
  <Swipeable
  renderRightActions={swipeLeft}
  >

<View style={styles.view}>

<View style={styles.subview1}>
    <FastImage
    style={[styles.img,usrStatus == 'online' ?  {borderColor:AppColor.OnlineColor} : {borderColor:AppColor.OfflineColor}]}
        source={ usrImage == 'profile50.png' ? require('../assets/profile50.png') : {uri:usrImage} } 
       />
</View>

    <View style={styles.subview2}>
        <AppText.PMediumText>{name}</AppText.PMediumText>
        <Icons onPress={onPress} />
    </View>

{/*     <View style={styles.subview4}>
      <Icon name="chatbubble-ellipses" style={styles.newicon} />
    </View> */}

  {!usrLastSeen || usrStatus === 'online' ?
     <View style={styles.subview3}>
     <AppText.LGrayText>{usrStatus === 'online' ? "online" : "offline"}</AppText.LGrayText>
     </View>
      : 
    <View style={styles.subview3}>
    <AppText.LGrayText>{status === '+46730000000' ? '' : "last seen"}</AppText.LGrayText>
    <AppText.LGrayText>{status === '+46730000000' ? "online" : usrLastSeen}</AppText.LGrayText>
    <AppText.LGrayText>{status === '+46730000000' ? '' : usrLastSeenTime}</AppText.LGrayText>
    </View>
  }

    <View style={styles.subview5}/>

</View>

</Swipeable>

  );
};

export default UserItem;

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignContent:'center',
        justifyContent: 'space-between' ,
        height:AppStyle.hh / 8,
      },
      status: {
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'center',
        alignSelf: 'center',
        width:AppStyle.ww / 5,
      },
      subview1: {
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'center',
        alignSelf: 'center',
        width: AppStyle.ww / 5.5,
      },
      subview2: {
        flexDirection: 'column',
        alignContent:'center',
        justifyContent:'center',
        alignSelf: 'center',
        marginHorizontal:5,
        width: AppStyle.ww / 1.85,
      },
      subview3: {
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'center',
        alignSelf: 'center',
        width:AppStyle.ww / 7,
      },
      subview4: {
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'center',
        alignSelf: 'center',
        width:AppStyle.ww / 17,
        height: AppStyle.hh / 30,
        borderRadius: AppStyle.ww / 2,
      },
      subview5: {
        alignItems:'center',
        justifyContent:'center',
        alignSelf: 'center',
        backgroundColor:AppColor.LightGrayColor,
        width:AppStyle.ww / 80,
        height: AppStyle.hh / 22,
        borderBottomLeftRadius: AppStyle.ww / 20,
        borderTopLeftRadius: AppStyle.ww / 20,
      },
      img: {
        width: AppStyle.ww / 7.3,
        height:(AppStyle.hh + AppStyle.ww) / 20,
        borderRadius:AppStyle.ww / 30,
        borderWidth:2,
        alignSelf:'center'
      },
    swipeLeft: {
      height: AppStyle.hh / 12,
      width: AppStyle.ww /3.4,
      backgroundColor:AppColor.SLightColor,
      justifyContent:'center',
      alignSelf:'center',
      borderBottomLeftRadius: AppStyle.ww / 20,
      borderTopLeftRadius: AppStyle.ww / 20,
      flexDirection:'row',
      opacity:0.8
    },
    icon:{
      fontSize:AppStyle.IconLarge,
      color:AppColor.WhiteColor,
      alignSelf:'center',
      marginHorizontal:AppStyle.ww / 45
    },
    icon1:{
      fontSize:AppStyle.IconSize,
      color:AppColor.WhiteColor,
      alignSelf:'center',
      marginHorizontal:AppStyle.ww / 45
    },
    newicon:{
      fontSize:AppStyle.IconSmall,
      color:AppColor.OnlineColor
    }

  });