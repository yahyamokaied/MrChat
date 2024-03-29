import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Keyboard, KeyboardAvoidingView, TextInput,
  View, FlatList, TouchableOpacity, Platform, Image, Alert
} from 'react-native';

import {
  AppColor, Icon, ChatItem, AppStyle, AppText, LoadingModal, ImagePicker
} from '../components';

import MapModal from './MapModal';

import { useSelector, useDispatch } from 'react-redux';
import {
  getChat, startLoading1, stopLoading1, sendMessage,
  getVibes, sendVibes, getBlockedUsers, setAllChat, setLocationStart
} from '../redux/actions';

import FastImage from 'react-native-fast-image';
import RNFS from 'react-native-fs';


// ChatScreen
const ChatScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const user2 = useSelector(state => state.auth.user2);
  const allChat = useSelector(state => state.chat.allChat);
  const chatLength = useSelector(state => state.chat.chatLength);
  const vibesLength = useSelector(state => state.chat.vibesLength);
  const isLoading1 = useSelector(state => state.chat.isLoading1);
  const blockedUsers = useSelector(state => state.chat.blockedUsers);


  const [currentMessage, setCurrentMessage] = useState(null);
  const [audioBase64, setAudioBase64] = useState(null);

  useEffect(() => {
    try {
      navigation.setOptions({
        headerTintColor: AppColor.WhiteColor,
        headerStyle: { height: AppStyle.hh / 10, backgroundColor: AppColor.SLightColor },
        headerTitleStyle: { alignSelf: 'center' },
        headerTitle:
          <>
            <View style={{ paddingVertical: 10, justifyContent: 'center' }}>
              <AppText.LWhiteText>  {user2.userName}  </AppText.LWhiteText>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <FastImage source={!user2.photoURL || user2.photoURL === 'profile50.png' ? require('../assets/profile50.png') : { uri: user2.photoURL }}
                style={{
                  width: 35, height: 35, resizeMode: 'cover', alignSelf: 'center',
                  borderRadius: AppStyle.ww / 40, borderColor: AppColor.WhiteColor, borderWidth: 1
                }}
              />
            </View>
          </>
      });

    }
    catch (error) {
      console.log('ChatScreen1 error', error);
    }


    try {
      dispatch(startLoading1());
      dispatch(getBlockedUsers(userData.phoneNumber, user2.phoneNumber, navigation));
      console.log('blockedUsers in Chat Screen', blockedUsers);
      dispatch(setAllChat(null));
      if (blockedUsers.includes(user2.phoneNumber) == true) {
        dispatch(setAllChat(null));
        navigation.replace("Back");
      }
      else {
        dispatch(getChat(userData.phoneNumber, user2.phoneNumber));
        dispatch(getVibes(userData.phoneNumber, vibesLength));
      }
      dispatch(stopLoading1());

    }
    catch (error) {
      console.log('ChatScreen2 error', error);
      dispatch(stopLoading1());
    }

  }, []);


  const validateMessage = (Message) => {
    if (Message != null && /\S/.test(Message) == true)
      return true;
    return false;
  };

  const SendMessages = (uid, user, displayName, user2, user2name, Message) => {
    this.textInput.clear();
    dispatch(sendMessage(uid, user, displayName, user2, user2name, Message));
    setCurrentMessage('');
  };


  const SendVibe = (user, user2) => {
    dispatch(sendVibes(user, user2));
  };

  const sendGalery = async () => {

    dispatch(startLoading1());
    await ImagePicker.openPicker({
      width: 300,
      height: 300,
      compressImageQuality: 0.6,
      cropping: true,
      includeBase64: true
    })
      .then(image =>

        dispatch(sendMessage(
          userData.uid, userData.phoneNumber, userData.displayName, user2.phoneNumber, user2.userName,
          `data:${image.mime};base64,${image.data}`
        ))

        //console.log(image.sourceURL)


      )
      .catch(error => {
        console.log("ChoosePhoto error : ", error);
      });
    dispatch(stopLoading1());

  };

  const sendCamera = async () => {
    dispatch(startLoading1());
    await ImagePicker.openCamera({
      width: 300,
      height: 300,
      compressImageQuality: 0.6,
      cropping: true,
      includeBase64: true
    })
      .then(image =>

        dispatch(sendMessage(
          userData.uid, userData.phoneNumber, userData.displayName, user2.phoneNumber, user2.userName,
          `data:${image.mime};base64,${image.data}`
        ))

        //console.log(image.sourceURL)
      )
      .catch(error => {
        console.log("TakePhoto error : ", error);
      });
    dispatch(stopLoading1());
  };

  const sendVoice = () => {


    RNFS.readFile(audioPath, "base64").then((res) => setAudioBase64(res))

    const path = `${RNFS.DocumentDirectoryPath}/${attachment}.aac`;
    RNFS.writeFile(path, yourBase64String, 'base64').then(() => playSound())
    const playSound = () => {
      const sound = new Sound(path, '', () => callback(sound))
    }
    const callback = () => sound.play(successCallback)


  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container} keyboardVerticalOffset={Platform.OS === 'ios' ? (AppStyle.hh + AppStyle.ww) / 16 : (AppStyle.hh + AppStyle.ww) / 12
      }
    >
      <MapModal />

      <View style={styles.inner} >
        {chatLength === 0 ?
          <View style={{ flex: 1, justifyContent: 'center' }} onPress={() => { Keyboard.dismiss() }}>
            <AppText.SSmallText>
              {user2.phoneNumber === '+46730000000' ? 'We will reply within 24 hours' : "Empty! .. not boring as it sounds .. send message now"}
            </AppText.SSmallText>
          </View>
          :
          <FlatList style={styles.list}
            onPress={() => { Keyboard.dismiss() }}
            inverted={true}
            ref={this.flatListRef}
            data={allChat}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <ChatItem sender={item.Sender} message={item.Message} timeStamp={item.TimeStamp} />
            )}
          />
        }

        <View style={styles.sendview} >
          <TouchableOpacity style={styles.iconview}
            onPress={() => {
              //SendVibe ( userData.phoneNumber, user2.phoneNumber )
              dispatch(setLocationStart());
            }}>
            <Icon name="location" style={styles.icon} />
          </TouchableOpacity>


          <TextInput placeholder=".... Type here ...." style={styles.txtinput}
            placeholderTextColor={AppColor.LightGrayColor}
            autoCapitalize="none" autoCorrect={false}
            maxLength={400} returnKeyType="done" ref={input => { this.textInput = input }}
            onChangeText={TextInput => setCurrentMessage(TextInput)}
          />

          {validateMessage(currentMessage) ?
            <TouchableOpacity style={styles.iconview}
              onPress={() => SendMessages(userData.uid, userData.phoneNumber, userData.displayName, user2.phoneNumber, user2.userName, currentMessage)}
            >
              <Icon name="paper-plane"
                style={styles.icon} />
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.hiddeniconview}
              onPress={() => null}
            >
              <Icon name="paper-plane"
                style={styles.icon} />
            </TouchableOpacity>
          }

        </View>
        <View style={styles.media} >
          <Icon name="images" style={styles.icongallery} onPress={() => sendGalery()} />
          <Icon name="camera" style={styles.iconmedia} onPress={() => sendCamera()} />
          {/* <Icon name="mic" style={styles.iconmedia}  onPress={ () => sendVoice() }/> */}
        </View>
      </View>
      <LoadingModal loading={isLoading1} />
    </KeyboardAvoidingView>

  );
};


export default ChatScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    backgroundColor: AppColor.WhiteColor,
    flex: 1,
    justifyContent: "space-around",
    paddingBottom: AppStyle.hh / 100,
  },
  media: {
    width: AppStyle.ww,
    height: AppStyle.hh / 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: AppColor.SDarkColor,
    position: 'absolute',
    bottom: AppStyle.hh / 12.5,
    alignSelf: 'center',
    paddingHorizontal: AppStyle.ww / 4,
    borderTopRightRadius: AppStyle.ww / 30,
    borderTopLeftRadius: AppStyle.ww / 30,
  },
  sendview: {
    height: AppStyle.hh / 14,
    paddingVertical: AppStyle.hh / 80,
    width: AppStyle.ww,
    alignSelf: 'center',
    borderTopWidth: 0.2,
    borderColor: AppColor.SLightColor,
    backgroundColor: AppColor.WhiteColor,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    marginTop: AppStyle.hh / 15
  },
  txtinput: {
    width: AppStyle.ww / 1.35,
    height: (AppStyle.hh + AppStyle.ww) / 28,
    borderRadius: AppStyle.ww / 4,
    borderBottomWidth: 0.2,
    borderColor: AppColor.SLightColor,
    backgroundColor: AppColor.WhiteColor,
    marginHorizontal: AppStyle.ww / 45,
    textAlign: 'center',
    alignSelf: 'center'
  },
  iconview: {
    width: AppStyle.ww / 13.5,
    height: (AppStyle.hh + AppStyle.ww) / 40,
    borderRadius: AppStyle.ww / 4,
    backgroundColor: AppColor.SDarkColor,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  hiddeniconview: {
    width: AppStyle.ww / 13.5,
    height: (AppStyle.hh + AppStyle.ww) / 40,
    borderRadius: AppStyle.ww / 4,
    backgroundColor: AppColor.SLightColor,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  iconmedia: {
    fontSize: AppStyle.IconSize,
    alignSelf: 'center',
    color: AppColor.WhiteColor,
    paddingVertical: 2
  },
  icongallery: {
    fontSize: AppStyle.IconLarge,
    alignSelf: 'center',
    color: AppColor.WhiteColor,
    paddingVertical: 2
  },
  icon: {
    fontSize: AppStyle.IconSmall,
    alignSelf: 'center',
    color: AppColor.WhiteColor,
  },
  block: {
    fontSize: AppStyle.IconSmall,
    alignSelf: 'center',
    color: AppColor.WhiteColor,
    paddingRight: AppStyle.ww / 20
  },
});
