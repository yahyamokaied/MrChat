import React, { useEffect, useState } from 'react';
import { View, StyleSheet,Image, TouchableOpacity } from 'react-native';

import * as AppColor from './AppColor';
import * as AppText from './AppText';
import * as AppStyle from './AppStyle';
import TimeStampToDate from './TimeStampToDate';


import { useSelector } from 'react-redux';

import FastImage from 'react-native-fast-image';


const ChatItem = ( { sender, message, timeStamp } ) => {

  const userData = useSelector(state => state.auth.userData);
  const user2 = useSelector(state => state.auth.user2);
  const photoURL= useSelector(state => state.auth.photoURL);

  const [usrImg,setUsrImg] = useState(null);

useEffect(() => {

  if (sender == userData.phoneNumber)
  {
    setUsrImg(photoURL);
  }
  else {
    setUsrImg(user2.photoURL);
  }

},[]);


const currentTime = TimeStampToDate(timeStamp);

  
return (

    <View style={sender == userData.phoneNumber ? styles.viewLeft : styles.viewRight }>
    <TouchableOpacity style={ sender == userData.phoneNumber  ?  styles.left : styles.right  }>
    <AppText.PMediumText>{message}</AppText.PMediumText>
    <AppText.LGrayText>{currentTime}</AppText.LGrayText>
    </TouchableOpacity>
    <FastImage style={styles.img}
    source={ !photoURL || usrImg === "profile50.png" ?
    require('../assets/profile50.png') : { uri: usrImg } } 
    />
    </View> 

  );
  };
  
  export default ChatItem;
  
  const styles = StyleSheet.create({
    viewLeft: {
      flex:1,
      marginVertical: AppStyle.hh / 120,
      flexDirection:'row',
      alignSelf:'center',
      justifyContent:'center',
      alignItems:'center',
    },
    viewRight: {
      flex:1,
      marginVertical: AppStyle.hh / 120,
      flexDirection: 'row-reverse',
      alignSelf:'center',
      justifyContent:'center',
      alignItems:'center',
    },
    left: {
      flex:1,
      justifyContent:'center',
      borderRadius: AppStyle.ww / 40,
      borderColor: AppColor.chatR,
      borderWidth:0.5,
      marginLeft: AppStyle.ww / 20,
      paddingHorizontal: (AppStyle.ww + AppStyle.hh) / 120,
      paddingTop: (AppStyle.ww + AppStyle.hh) / 160
    },
    right: {
      flex:1,
      justifyContent:'center',
      borderRadius: AppStyle.ww / 40,
      borderColor: AppColor.PLightColor,
      borderWidth:0.5,
      marginRight: AppStyle.ww / 20,
      paddingHorizontal: (AppStyle.ww + AppStyle.hh) / 120,
      paddingTop: (AppStyle.ww + AppStyle.hh) / 160
  },
    img: {
      width: AppStyle.ww / 14,
      height: (AppStyle.hh + AppStyle.ww ) / 40,
      resizeMode:'contain',
      alignSelf: 'flex-start',
      borderColor:AppColor.LightGrayColor,
      borderRadius: AppStyle.ww / 4,
      borderWidth:0.5,
      marginHorizontal: AppStyle.ww / 30,
        },
  
  });