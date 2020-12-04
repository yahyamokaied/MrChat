import React, { useEffect,useState } from 'react';
import { StyleSheet,View, TouchableOpacity,Image } from 'react-native';

import * as AppColor from '../components/AppColor';
import * as ApptText from '../components/AppText';
import Icon from 'react-native-vector-icons/Ionicons';

import { storage } from '../Setup';

import FastImage from 'react-native-fast-image';



export default ContactItem =  ( {onPress,givenName,familyName,phoneNumber} ) => {

  const [usrImage,setUsrImage] = useState(null);

  useEffect( () => {
      (async () => {

        try {
          const url = await storage()
          .ref(`/profile/${phoneNumber}/${phoneNumber}.png`)
          .getDownloadURL().then(console.log("user photo restored."));
          console.log('usrImage:',url)
          setUsrImage(url);
        } catch (error) {
          console.log('user2 image error',error)
        }

      })();
  },[]);




   return (
    <TouchableOpacity onPress={onPress}  style={styles.view}>
        <FastImage
                style={styles.img}
                source={!usrImage  || usrImage === 'profile50.png' ? require('../assets/profile50.png') : {uri:usrImage} } 
        />
        <View style={styles.subview}>
        <ApptText.SNormalText>{givenName} {familyName}</ApptText.SNormalText>
        <ApptText.PNormalText>{phoneNumber}</ApptText.PNormalText>
        </View>
        <Icon
            name="chatbubbles-outline"
            style={styles.icon}
            />
        </TouchableOpacity>
        );

}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:30,
        marginVertical:10,
      },
      subview: {
        flexDirection: 'column',
        alignContent:'flex-start',
        justifyContent:'flex-start',
        marginHorizontal:20,
      },
    img: {
      width: 40,
      height: 40,
      resizeMode: 'cover',
      borderRadius: 15,
      alignSelf:'center',
      borderColor:AppColor.PLightColor,
      borderWidth:0.5,
    },
    icon:{
      fontSize:34,
      color:AppColor.PLightColor,
      alignSelf:'center',
      marginRight:12
    }
})


/* const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i; */