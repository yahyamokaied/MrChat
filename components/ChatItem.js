import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity,Linking,Platform } from 'react-native';

import * as AppColor from './AppColor';
import * as AppText from './AppText';
import * as AppStyle from './AppStyle';
import TimeStampToDate from './TimeStampToDate';

import { useSelector } from 'react-redux';

import FastImage from 'react-native-fast-image';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import RNLocation from 'react-native-location';

RNLocation.configure({
  distanceFilter: 5.0
})

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


const linkToGoogleMap = async () => {
  console.log('linkToGoogleMap pressed')


  const latLng = `${message[1]},${message[2]}`;


  RNLocation.getLatestLocation({ timeout: 1000 })
  .then(latestLocation => {
    // Use the location here
    const latLng1 = `${latestLocation.latitude},${latestLocation.longitude}`;

     Linking.openURL(
      Platform.OS === 'ios'
      ? `googleMaps://app?saddr=${latLng1}&daddr=${latLng}`
      : `google.navigation:q=${latLng}`
    )
    .catch(err => console.error("Couldn't linkToGoogleMap", err));
  console.log(`lat ${message[1]} long ${message[2]}`)

  })


}

  
return (

    <View style={sender == userData.phoneNumber ? styles.viewLeft : styles.viewRight }>


    {Array.isArray(message) ?
    <View style={styles.maplocation}>
    <View style={styles.mapview}>
    <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: message[1],
         longitude: message[2],
         latitudeDelta: 0.004,
         longitudeDelta: 0.006,
       }}
       ref= {ref => map = ref}
       zoomTapEnabled={false}
       scrollEnabled={false}
       onPress={() => {
          linkToGoogleMap()
       }}
    >
    <Marker 
    coordinate={{
      latitude: message[1],
      longitude: message[2]
      }}
      image={require('../assets/pin.png')}
      title="Marker"
      description="Description"
    >
   </Marker>
   </MapView>
   </View>
   <AppText.LWhiteText>{message[3]}</AppText.LWhiteText>
   </View>
   :
    <TouchableOpacity style={ sender == userData.phoneNumber  ?  styles.left : styles.right  }>
    <AppText.PMediumText>{message}</AppText.PMediumText>
    <AppText.LGrayText>{currentTime}</AppText.LGrayText>
    </TouchableOpacity>

    }


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
        maplocation:{
          width:AppStyle.ww / 1.22,
          height:AppStyle.hh / 3.7,
          alignSelf:'center',
          marginVertical: AppStyle.hh / 23,
          marginLeft:AppStyle.ww / 20,
          flexDirection:'column',
          backgroundColor:AppColor.DarkGrayColor,
          borderRadius:AppStyle.ww / 40
        },
        mapview:{
          height:'90%',
          width:'100%',
          alignSelf:'center',
        },
        map: {
          ...StyleSheet.absoluteFillObject,
        }
  
  });