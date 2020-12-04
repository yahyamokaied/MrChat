import React,{ useState,useEffect,useCallback } from 'react';
import { StyleSheet,TextInput, FlatList,View, Image, ActivityIndicator,Linking } from 'react-native';

import {
  AppColor, ContactItem, AppStyle, LinearGradient, Screen, LoadingModal, AppText, AppButton
} from '../components';

import { storage } from '../Setup';

import { useSelector,useDispatch } from 'react-redux';
import { setUser2,startLoading1,stopLoading1,getBlockedUsers,FetchContacts,setContactsActive } from '../redux/actions';




const ContactScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const contacts = useSelector(state => state.auth.contacts);
    const user2 = useSelector(state => state.auth.user2);
    const isLoading1 = useSelector(state => state.chat.isLoading1);
    const blockedUsers = useSelector(state => state.chat.blockedUsers);
    const contactsActive = useSelector(state => state.auth.contactsActive);


    const [inputdata,setInputdata] = useState(contacts);

    useEffect(() => { 

      try {
        dispatch ( FetchContacts () );
        setInputdata(contacts);
        dispatch ( getBlockedUsers ( userData.phoneNumber ) );
      }
      catch (error)
      {
        console.log('getBlockedUsers error',error);
      }
      },[]);

  

searchFilterFunction = (text) => {
    try {
        const nData = contacts.filter(item => {
          const textData = text.toLowerCase();
          if(item.givenName != null )
          {
          const itemData = item.givenName.toLowerCase();
          if (itemData.indexOf(textData) > -1)
          return itemData.indexOf(textData) > -1
          }
          if(item.familyName != null )
          {
          const itemData = item.familyName.toLowerCase();
          if (itemData.indexOf(textData) > -1)
          return itemData.indexOf(textData) > -1
          }
          if(item.phoneNumber != null )
          {
          const itemData = item.phoneNumber.toLowerCase();
          if (itemData.indexOf(textData) > -1)
          return itemData.indexOf(textData) > -1
          }
        });
        setInputdata(nData);
    }
    catch (error)
    {
        console.log(error)
    };

};







async function startChat (item) {
    dispatch(startLoading1());
          var urlA=[];
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
            dispatch(stopLoading1());
        }
        dispatch(stopLoading1());

  if ( blockedUsers.includes(item.phoneNumber) == true )
  {
        return null;
  }
  if ( blockedUsers.includes(item.phoneNumber) == false )
  {
    dispatch( setUser2 ({
      phoneNumber : item.phoneNumber,
      userName : item.givenName+' '+item.familyName,
      photoURL : urlA[0]
  }));
    navigation.navigate("Chat");

  }
};

  const listSeperator =  () => <View style={{width:'80%',height:1, backgroundColor:AppColor.LightGrayColor, alignSelf:'center'}}/>
  const listLayout =  (data, index) => ( {length: 50, offset: 50 * index, index} )
  const listKey = (item) => item.recordID
  const listStyle = {marginVertical:1, height:'90%'}
  const listItem = ({ item }) =>
  <ContactItem  onPress={() => { startChat (item) } }
  givenName={item.givenName} familyName={item.familyName} phoneNumber={item.phoneNumber} />

  const listFooter = () => {
    return (
        <View style={styles.loader} >
        <ActivityIndicator size='large' color={AppColor.AlarmColor} />
        </View>
      );
  };


return (
    <Screen>
      <View style={styles.container}>
      <LinearGradient colors={[AppColor.SDarkColor,AppColor.SLightColor]}
      style={styles.bgcolor}>
      </LinearGradient>
      <Image
      style={styles.logo}
      source={require("../assets/logo-white.png")}
      />
      <View style={styles.searchview}>
      <TextInput  placeholder="Search for contact : Name / Phone"
      placeholderTextColor={AppColor.LightGrayColor}
      onChangeText={text => searchFilterFunction(text)}
      style={styles.textinput}
      />
      </View>

      {!inputdata ? 
            <View style={{alignSelf:'center',margin:50}}>
            <AppText.SMediumText>Can't see your phone contacts?</AppText.SMediumText>
            <AppText.PSmallText>1- press on CONTACTS SETTING</AppText.PSmallText>
            <AppText.PSmallText>2- once MrChat setting be shown</AppText.PSmallText>
            <AppText.PSmallText>3- Activate Contacts button (Make it Green) </AppText.PSmallText>
            <AppText.PSmallText>3- Back here</AppText.PSmallText>
            <AppButton.PButton onPress={ () => Linking.openURL('app-settings:{1}')}>CONTACTS SETTING</AppButton.PButton>
            </View>
      : null}
      <FlatList
      style={ listStyle }
      data={ inputdata }
      renderItem={ listItem }
      keyExtractor = { listKey }
      extraData={ user2 }
      getItemLayout={ listLayout }
      ItemSeparatorComponent={ listSeperator }
      ListFooterComponent={ listFooter}
      initialNumToRender={20}
      />
      </View>
    <LoadingModal loading={isLoading1} />
    </Screen>
);
};

export default React.memo(ContactScreen);

const styles = StyleSheet.create({
  container: {
    width:AppStyle.ww,
    height:AppStyle.hh,
    flex:1
},
  bgcolor: {
    width: AppStyle.ww,
    height: AppStyle.hh / 7.5,
    alignSelf: 'center',
    marginBottom:AppStyle.hh / 32,
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
  searchview: {
    position:'absolute',
    top:AppStyle.hh / 8.6,
    left:0,
    borderColor:AppColor.SLightColor,
    backgroundColor:AppColor.WhiteColor,
    borderWidth:1,
    width:AppStyle.ww / 1.4,
    height:AppStyle.hh / 21,
    borderTopRightRadius:AppStyle.ww / 6,
    borderBottomRightRadius:AppStyle.ww / 6,
    alignSelf:'center',
    paddingHorizontal:AppStyle.ww / 60,
    borderWidth:1,
  },
  textinput: {  
    width:AppStyle.ww / 1.4,
    paddingHorizontal:AppStyle.ww / 20,
    paddingVertical:AppStyle.hh / 100,
    color:AppColor.PLightColor,
    fontSize:AppStyle.FontMedium,
    textAlign:'center',
    color:AppColor.PLightColor
  },
  loader:{
    justifyContent:'center',
    marginVertical:15
  }
});