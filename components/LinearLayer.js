import React,{useContext} from 'react';
import { View, StyleSheet,Image, TouchableOpacity } from 'react-native';

import * as AppColor from './AppColor';
import * as AppText from './AppText';

import LinearGradient from 'react-native-linear-gradient';


import TimeStampToDate from './TimeStampToDate';

import AuthContext from '../auth/context';

const ChatItem = ( {sender,message,timeStamp} ) => {
  const { user, setUser } = useContext(AuthContext);

  var imageName = "profile.png";

const currentTime = TimeStampToDate(timeStamp);

  if(sender === user) {
     var chatDirection = "flex-end"
     var chatColor = AppColor.chatR
  }
  else {
    var chatDirection = "flex-start"
    var chatColor = AppColor.chatL
  }



  
return (
<View style={styles.view}>

{sender===user ?
<TouchableOpacity style={[{alignSelf:"flex-end"},{backgroundColor:chatColor},styles.bgview]} >
<AppText.PMediumText>{message}</AppText.PMediumText>
<View style={styles.userdataview}>
<Image style={styles.img} source={require('../assets/profile1.png')} />
<AppText.LWhiteText>{currentTime}</AppText.LWhiteText>
</View>
</TouchableOpacity> :
<TouchableOpacity style={[{alignSelf:"flex-start"},{backgroundColor:chatColor},styles.bgview]} >
<AppText.PMediumText>{message}</AppText.PMediumText>
<View style={styles.userdataview}>
<Image style={styles.img} source={require('../assets/profile2.png')} />
<AppText.LWhiteText>{currentTime}</AppText.LWhiteText>
</View>
</TouchableOpacity>
}

</View>

);
};

export default ChatItem;

const styles = StyleSheet.create({
  view: {
    flex:1,
    marginVertical:8,
    marginHorizontal:4,
    margin:2,
  },
  bgview: {
      width:'80%',
      alignContent:'center',
        borderRadius: 10,
        borderBottomLeftRadius: 40,
        borderRadius: 10,
        padding:8,
        paddingBottom:30,
        margin:2
      },
      userdataview:{
        flexDirection:'row',
        justifyContent:'space-between',
        position:'absolute',
        bottom:-4,
        margin:1
      },
      img: {
        width: 25,
        height: 25,
        resizeMode: 'cover',
        borderRadius: 15,
        alignSelf: 'center',
        borderColor:AppColor.PLightColor,
        borderWidth:0.5,
        marginRight:8,
      },

})