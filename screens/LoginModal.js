import React, { useEffect,useState } from "react";
import { Modal, StyleSheet, View } from "react-native";

import {
  AppButton, AppColor, AppStyle, AppText, AppTextInput, Icon, ShowError, ImagePicker
} from '../components';

import {useSelector, useDispatch} from 'react-redux';
import { setFirstTimeStop,FetchUserData, stopLoading,startLoading,
         uploadUserPhoto,updateDisplayName,updateEmail,FetchContacts,getConversations } from '../redux/actions';

import FastImage from 'react-native-fast-image';


export default LoginModal = () => {

  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const photoURL= useSelector(state => state.auth.photoURL);
  const [userName, setUserName] = useState( userData ? userData.displayName : null );
  const [userEmail, setUserEmail] = useState( userData ? userData.email : null );
  const contacts = useSelector(state => state.auth.contacts);


  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    try {
      dispatch ( FetchUserData() );
    }
    catch (error)
    {
      console.log("useEffect Login Modal ",error)
    }
  },[]);


  const TakePhoto = async () => {
    dispatch(startLoading());
      await ImagePicker.openCamera({
      width: 300,
      height: 300,
      compressImageQuality:0.8,
      cropping: true,
      includeBase64: true
      })
      .then(image => {              
      dispatch(uploadUserPhoto(userData.phoneNumber,image));
      })
      .catch(error => {
      console.log( "TakePhoto error : ", error );
      });
    dispatch(stopLoading());
  };


  const ChoosePhoto = async () => {
    dispatch(startLoading());
      await ImagePicker.openPicker({
      width: AppStyle.ww / 4,
      height:AppStyle.ww / 4,
      compressImageQuality:0.8,
      cropping: true,
      includeBase64: true
      })
      .then(image => {              
      dispatch(uploadUserPhoto(userData.phoneNumber,image));
      })
      .catch(error => {
      console.log( "ChoosePhoto error : ", error );
      });
    dispatch(stopLoading());
  };
  
  
  const SetProfileInfo = () => {
    const regx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    if(userName == null || /\S/.test(userName) != true)
    { ShowError ("Name : cannot be empty"); return null };

    if(userEmail == null || /\S/.test(userEmail) != true)
    { ShowError ("Email : cannot be empty"); return null };

    if(userName.length < 4) { ShowError ("Name : Minimum of 3 characters"); return null };
    if(regx.test(userEmail) != true ) { ShowError ("Email : not valid"); return null };

    dispatch ( updateDisplayName (userName) );
    dispatch ( updateEmail (userEmail) );

    setModalVisible(!modalVisible);
    dispatch ( setFirstTimeStop()  );

    dispatch ( FetchContacts () );
    dispatch ( getConversations ( contacts , userData.phoneNumber ) );


  };


  return (
    <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    >
    <View style={styles.centeredView}>

    <View style={styles.modalView}>
    <AppText.SMediumText>Profile</AppText.SMediumText>
    <AppText.PSmallText>let other people know this awesome person</AppText.PSmallText>

    <FastImage style={styles.imgbg}  
       source={ photoURL ? { uri: photoURL } : require('../assets/profile300.png')}>
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


    <AppTextInput
    placeholder="Your Name" icon="person-outline"
    placeholderTextColor={AppColor.LightGrayColor}
    maxLength={20} returnKeyType="done" value={ userName } 
    onChangeText={TextInputName => setUserName(TextInputName)}
    autoCapitalize="none" autoCorrect={false} keyboardType="default" />

    <AppTextInput
    placeholder="Your Email" icon="mail-outline"
    placeholderTextColor={AppColor.LightGrayColor}
    maxLength={25} returnKeyType="done" value={ userEmail } 
    onChangeText={TextInputEmail => setUserEmail(TextInputEmail)}
    autoCapitalize="none" autoCorrect={false} keyboardType="email-address" />

    <AppText.SSmallText>to enjoy our services, we have to read your contacts</AppText.SSmallText>
    <AppText.LGrayText>only contacts that you communicate with, uploads to our server</AppText.LGrayText>
    <AppButton.PButton onPress={ () => { SetProfileInfo (userName,userEmail) } } >Start</AppButton.PButton>


    </View>

    </View>
    </Modal>
  );
  };

const styles = StyleSheet.create ({
    mainview: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop:AppStyle.PageStart,
    backgroundColor:AppColor.SLightColor,
  },
  modalView: {
    backgroundColor: AppColor.WhiteColor,
    width:AppStyle.ww / 1.2,
    height:AppStyle.hh / 1.4,
    borderRadius: AppStyle.ww / 14,
    padding: AppStyle.ww / 50,
    alignItems: "center",
    shadowColor: AppColor.SDarkColor,
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgbg: {
    width: AppStyle.ww / 2,
    height: AppStyle.ww / 2,
    marginBottom: AppStyle.hh / 60,
    marginTop: AppStyle.hh / 60,
    resizeMode:'cover',
    alignSelf: 'center',
    shadowColor: AppColor.SDarkColor,
    borderRadius: 15,
    borderWidth:1,
    borderColor:AppColor.WhiteColor,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    elevation: 5
  },
  img: {
    width: AppStyle.ww / 2,
    height: AppStyle.ww / 2,
    resizeMode:'cover',
    alignSelf: 'center',
  },
    icondown: {
    marginTop: AppStyle.hh / 90,
    flexDirection:'row',
    justifyContent:'space-between',
  },

  iconleft:{
    opacity:0.8,
    fontSize:AppStyle.IconMedium,
    color:AppColor.WhiteColor,
    marginHorizontal:AppStyle.ww / 60,
    alignSelf: 'center',
    shadowColor: AppColor.PDarkColor,
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    elevation: 5
  },
  iconright:{
    opacity:0.8,
    fontSize:AppStyle.IconMedium / 1.2,
    color:AppColor.WhiteColor,
    marginHorizontal:AppStyle.ww / 55,
    alignSelf: 'center',
    shadowColor: AppColor.PDarkColor,
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    elevation: 5
  }
});

