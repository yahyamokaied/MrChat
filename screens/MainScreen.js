import React,{ useEffect } from 'react';
import { StyleSheet, View, FlatList ,Image } from 'react-native';
import {
  AppColor, AppText, Icon, UserItem, AppStyle, LinearGradient,
  Screen, LoadingModal
} from '../components';

import LoginModal from './LoginModal';

import { storage } from '../Setup';

import { useSelector, useDispatch}  from 'react-redux';
import { setUser2,FetchUserData, startLoading1,stopLoading1,getConversations,setContactsActive
        ,getBlockedUsers
        } from '../redux/actions';

import FastImage from 'react-native-fast-image';



const MainScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const user2 = useSelector(state => state.auth.user2);
  const contacts = useSelector(state => state.auth.contacts);
  const photoURL= useSelector(state => state.auth.photoURL);
  const isLoading1 = useSelector(state => state.chat.isLoading1);
  const firstTime = useSelector(state => state.auth.firstTime);
  const conversationsLength = useSelector(state => state.chat.conversationsLength);
  const allConversations = useSelector(state => state.chat.allConversations);
  const blockedUsers = useSelector(state => state.chat.blockedUsers);

  useEffect(() => {
    try {
      dispatch ( FetchUserData() );
      dispatch ( getConversations ( contacts , userData.phoneNumber ) );
    }
    catch (error)
    {
      console.log("MainScreen error",error)
    }
  },[]);


useEffect(() => {
    try {
      dispatch ( getBlockedUsers ( userData.phoneNumber ) );
    }
    catch (error)
    {
      console.log('getBlockedUsers error',error);
    }
  },[]);
  

const AboutUs = async () => {
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
    dispatch( setUser2 ({
      phoneNumber : "+46730000000",
      userName : "Support & Feedback",
      photoURL : urlA[0]
    }))
    navigation.navigate("Chat");
  dispatch( stopLoading1 () );
};


const startChat = async (item) => {
  dispatch( startLoading1 () );
    try {
        urlA=[];
        var url = await storage()
        .ref(`/profile/${item.phoneNumber}/${item.phoneNumber}.png`)
        .getDownloadURL().then(console.log("user photo restored."));
        console.log('usr2Image:',url);
        urlA.push(url);
    }
    catch (error)
    {
        console.log('error usr2 from storage',error)
        urlA.push("profile50.png");
    }

    dispatch(stopLoading1());

  if ( blockedUsers.includes(item.phoneNumber) == true )
  {
        return null;
  }
  if ( blockedUsers.includes(item.phoneNumber) == false )
  {
    dispatch(setUser2({
      phoneNumber : item.phoneNumber,
      userName : item.name,
      photoURL : urlA[0]
  }));
    navigation.navigate("Chat");

  }
  dispatch(stopLoading1());
};

return (
  <Screen>
    {firstTime == true ? <LoginModal /> : console.log("modal off") }
    { conversationsLength == 0 ?
    <View style={styles.container}>
    <LinearGradient colors={[AppColor.SDarkColor,AppColor.SLightColor]}
    style={styles.bgcolor}>
    </LinearGradient>
    <FastImage
    style={styles.logo}
    source={require("../assets/logo-white.png")}
    />
    <Icon onPress={ () => AboutUs() } name="information-circle-outline" style={styles.aboutus} />
    <FastImage 
    style={styles.online}
    source={ !photoURL ? require('../assets/profile50.png') : {uri: photoURL }}
    />
    <View style={{justifyContent:'center', alignContent:'center', flex:1}} >
    <AppText.SSmallText>no conversations yet ... text your friends &#x21B4;</AppText.SSmallText> 
    </View>
    </View>
    :
    <View style={styles.container}>
    <LinearGradient colors={[AppColor.SDarkColor,AppColor.SLightColor]}
    style={styles.bgcolor}>
    </LinearGradient>
    <FastImage
    
    style={styles.logo}
    source={require("../assets/logo-white.png")}
    />
    <Icon onPress={ () => AboutUs() }
    name="information-circle-outline"
    style={styles.aboutus}
    />
    <FastImage 
    style={ styles.online }
    source={ !photoURL ? require('../assets/profile50.png') : {uri: photoURL }}
    />
    <FlatList
    style={{marginBottom:40}}
    data={ allConversations }
    keyExtractor = { (item,index) => item.key }
    extraData={user2}
    renderItem = {({ item }) =>
    <UserItem
    name={item.name}
    status={item.key}
    lastseen={item.key}
    photo={item.key}
    onPress={() =>  startChat(item)}
    />
    }
    ItemSeparatorComponent={() =>
    <View style={{width:AppStyle.ww / 1.2, height:1, backgroundColor:AppColor.LightGrayColor,
    alignSelf:'center'}}/>}
    />
    </View>
    }
  <LoadingModal loading={isLoading1} />

  </Screen>
);

};

export default React.memo(MainScreen);


const styles = StyleSheet.create({
  container: {
    width: AppStyle.ww,
    height: AppStyle.hh,
},
  bgcolor: {
    width: AppStyle.ww,
    height: AppStyle.hh / 7.5,
    alignSelf: 'center',
    marginBottom:AppStyle.hh / 30,
    borderBottomRightRadius: AppStyle.ww / 4,
  },
  logo: {
    marginTop:AppStyle.PageStart,
    width: AppStyle.ww / 2.4,
    height: AppStyle.hh / 18,
    opacity:0.8,
    resizeMode: 'stretch',
    alignSelf: 'center',
    position:'absolute',
    top:0
  },
  aboutus:{
    opacity:0.2,
    fontSize:AppStyle.IconMedium,
    color:AppColor.WhiteColor,
    position:'absolute',
    top:AppStyle.hh / 17,
    left: AppStyle.ww / 20,
    alignSelf: 'center',
    shadowColor: AppColor.PDarkColor,
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    elevation: 5,
  },
  online: {
    width: AppStyle.ww / 10,
    height: AppStyle.hh / 20,
    resizeMode: 'cover',
    alignSelf: 'center',
    position:'absolute',
    top:AppStyle.hh  / 10.5,
    right: AppStyle.ww / 12,
    borderRadius: AppStyle.ww / 4,
    borderColor:AppColor.OnlineColor,
    borderWidth: 2
  },
  ofline: {
    width: AppStyle.ww / 11,
    height: AppStyle.hh / 22,
    resizeMode: 'cover',
    alignSelf: 'center',
    position:'absolute',
    top:AppStyle.hh  / 10.5,
    right: AppStyle.ww / 12,
    borderRadius: AppStyle.ww / 4,
    borderColor:AppColor.OfflineColor,
    borderWidth:2
  }
});