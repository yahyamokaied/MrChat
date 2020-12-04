import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import * as AppColor from './AppColor';



const Icons = ({ onPress }) => {
return (

        <View style={styles.view}>
{/*         <TouchableOpacity style={styles.iconview}>
            <Icon
            name="today-outline"
            style={styles.icon1}
            />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconview}>
        <Icon
            name="videocam-outline"
            style={styles.icon1}
        />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconview}>
        <Icon
            name="mic-outline"
            style={styles.icon1}
        />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.iconview} onPress={onPress}>
        <Icon
            name="chatbubbles-outline"
            style={styles.icon}
        />
        </TouchableOpacity>
        </View>
);
};

export default Icons;


const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignContent:'center',
        justifyContent:'center',
        alignSelf:'center',
        margin:4,
      },
    iconview:{
    width: 40,
    height: 40,
    justifyContent:'center',
    backgroundColor:AppColor.WhiteColor,
    borderColor:AppColor.PLightColor,
    borderWidth:0.5,
    borderRadius:24,
    marginHorizontal:3
    },
    icon:{
        fontSize:26,
        color:AppColor.SDarkColor,
        alignSelf: 'center'
      },
      icon1:{
        fontSize:21,
        color:AppColor.LightGrayColor,
        alignSelf: 'center'
      }
  });