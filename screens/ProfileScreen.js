import React, { useEffect } from "react";
import { View, ImageBackground, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  AppColor, Icon, AppText, AppStyle, LinearGradient, Screen,LoadingModal, ImagePicker
} from '../components';

import { useSelector, useDispatch } from 'react-redux';
import { signOut,FetchUserData,startLoading1,stopLoading1,uploadUserPhoto } from '../redux/actions';

import FastImage from 'react-native-fast-image';

function ProfileScreen ({ navigation }) {

  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const photoURL= useSelector(state => state.auth.photoURL);
  const isLoading1 = useSelector(state => state.chat.isLoading1);

    useEffect(() => {
      try {
        dispatch(startLoading1());
        dispatch(FetchUserData());
        dispatch(stopLoading1());
      }
      catch (error)
      {
        console.log('ProfileScreen error',error)
      }
    },[]);


  const TakePhoto = async () => {
    dispatch(startLoading1());
      await ImagePicker.openCamera({
      width: 300,
      height: 300,
      compressImageQuality:0.7,
      cropping: true,
      includeBase64: true
      })
      .then(image => {  
      dispatch(startLoading1());            
      dispatch(uploadUserPhoto(userData.phoneNumber,image));
      dispatch(stopLoading1());
      })
      .catch(error => {
      console.log( "TakePhoto error : ", error );
      });
    dispatch(stopLoading1());
  };


  const ChoosePhoto = async () => {
    dispatch(startLoading1());
      await ImagePicker.openPicker({
      width: 300,
      height: 300,
      compressImageQuality:0.7,
      cropping: true,
      includeBase64: true
      })
      .then(image => {              
      dispatch(uploadUserPhoto(userData.phoneNumber,image));
      })
      .catch(error => {
      console.log( "ChoosePhoto error : ", error );
      });
    dispatch(stopLoading1());
  };


  const handelLogOut = () => {
    dispatch(startLoading1());
      dispatch(signOut())
    dispatch(stopLoading1());
  };

return (
  <Screen>
      <View style={styles.container}>
      <LinearGradient colors={[AppColor.SDarkColor,AppColor.SLightColor]}
      style={styles.bgcolor}>
      <FastImage 
      style={styles.logo}
      source={require("../assets/logo-white.png")}
      />
      


      </LinearGradient>
      <FastImage  style={styles.imgbg}
      source={photoURL ? { uri: photoURL } : require('../assets/profile300.png')}
      >
      <View style={styles.icondown} >
      <Icon onPress={ () => TakePhoto() }
      name="camera-outline"
      style={styles.iconleft}
      />
      <Icon onPress={ () => ChoosePhoto() }
      name="images-outline"
      style={styles.iconright}
      />
      </View>
      </FastImage>
      <View style={styles.subview}>
            <View style={styles.profilenameview}>
      <AppText.SBoldText>{userData ? userData.displayName : 'No Name' }</AppText.SBoldText>
      </View>
      <TouchableOpacity style={styles.logout}
      onPress={ () => handelLogOut()  } >
      <Icon
      name="exit-outline"
      style={styles.iconright}
      />
      </TouchableOpacity>
      </View>
      <View style={styles.subview1}>
      <AppText.PMediumText>{ userData ? userData.phoneNumber : 'No Phone Number'}</AppText.PMediumText>
      </View>
      <View style={styles.subview2}>
      <AppText.PMediumText>{ userData ? userData.email  : 'No Phone Number'}</AppText.PMediumText>
      </View>
      </View>
  <LoadingModal loading={isLoading1} />
  </Screen>
);
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    width:AppStyle.ww,
    height:AppStyle.hh,
},
  bgcolor: {
    width: AppStyle.ww,
    height: AppStyle.hh / 5,
    alignSelf: 'center',
  },
  logo: {
    marginTop:AppStyle.PageStart,
    width: AppStyle.ww / 2.4,
    height: AppStyle.hh / 18,
    opacity:0.8,
    resizeMode: 'stretch',
    alignSelf: 'center'
  },
  imgbg: {
    width: AppStyle.ww / 1.5,
    height:(AppStyle.hh + AppStyle.ww) / 4.2,
    marginTop: - AppStyle.hh / 13,
    resizeMode:'cover',
    alignSelf: 'center',
    borderRadius: 16,
    borderWidth:1,
    borderColor:AppColor.WhiteColor,
    shadowColor: AppColor.SDarkColor,
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    elevation: 5
  },
  img: {
    width: AppStyle.ww / 1.5,
    height:(AppStyle.hh + AppStyle.ww) / 4.2,
    resizeMode:'cover',
    alignSelf: 'center',
  },
  subview: {
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
    position:'absolute',
    top: (AppStyle.hh + AppStyle.ww) / 7,
    width:AppStyle.ww,
    marginTop: AppStyle.hh / 3.5,
    },
    profilenameview: {
      width: AppStyle.ww / 1.56,
      height: AppStyle.hh / 17,
      backgroundColor:AppColor.PDarkColor,
      borderBottomLeftRadius: AppStyle.ww / 8,
      borderTopRightRadius:AppStyle.ww / 10,
      justifyContent:'center',
      borderColor:AppColor.WhiteColor,
      borderWidth:0.2,
      marginRight:-3,
      },
      logoutview: {
        width: AppStyle.ww / 7,
        height: AppStyle.hh / 17,
        backgroundColor:AppColor.SDarkColor,
        justifyContent:'center',
        },
        logout: {
          width: AppStyle.ww / 7,
          height: AppStyle.hh / 17,
          backgroundColor:AppColor.SDarkColor,
          borderBottomRightRadius:AppStyle.ww / 10,
          borderTopLeftRadius:AppStyle.ww / 12,
          justifyContent:'center',
          },
      subview1: {
        alignSelf:'center',
        justifyContent:'center',
        marginTop:AppStyle.hh / 8.5,
      },
      subview2: {
        alignSelf: 'center',
        marginTop: AppStyle.hh / 50,
      },
      subview3: {
        alignSelf: 'center',
        marginTop: AppStyle.hh / 50,

      },
      icondown:{
        marginTop:AppStyle.hh / 100,
        flexDirection:'row',
        justifyContent:'space-between'
      },
      iconleft:{
        opacity:0.8,
        fontSize:AppStyle.IconLarge,
        color:AppColor.WhiteColor,
        marginHorizontal: AppStyle.ww / 30,
        alignSelf: 'center',
        shadowColor: AppColor.PDarkColor,
        shadowOffset: {
          width: 1,
          height: 1
        },
        shadowOpacity: 0.45,
        shadowRadius: 1.84,
        elevation: 5,
      },
      iconright:{
        opacity:0.8,
        fontSize:AppStyle.IconLarge / 1.1,
        color:AppColor.WhiteColor,
        marginHorizontal: AppStyle.ww / 30,
        alignSelf: 'center',
        shadowColor: AppColor.PDarkColor,
        shadowOffset: {
          width: 1,
          height: 3
        },
        shadowOpacity: 0.45,
        shadowRadius: 3.84,
        elevation: 5,
      }
  });