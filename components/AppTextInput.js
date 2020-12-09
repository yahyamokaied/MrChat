//import AppTextInput from './components/AppTextInput';


import React,{useState} from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import * as AppColor from './AppColor';


const AppTextInput = ({ icon, width="85%", ...otherProps }) => {

    const [inputdata,setInputdata] = useState('');

    return (
    <View style={[styles.view, { width }]}>
          <TextInput
            placeholderTextColor={AppColor.LightGBrayColor}
            onChangeText={text => setInputdata(text)}
            style={styles.textinput}

            {...otherProps}
          />
        <Icon
                name={icon}
                style={styles.icon}
                />
        </View>
        );
};

export default AppTextInput;

const styles = StyleSheet.create({
    view: {
      backgroundColor: AppColor.WhiteColor,
      borderBottomRightRadius:10,
      borderTopLeftRadius:10,
      borderColor:AppColor.SLightColor,
      borderWidth: 1,
      flexDirection: "row",
      padding: 6,
      alignSelf:'center',
      marginVertical: 10,
    },
    icon:{
      fontSize:26,
      color:AppColor.SDarkColor,
      marginLeft:6,
      position:'absolute',
      top:4
    },
    textinput: {  
      flex: 1,
      padding: 2,
      paddingLeft:28,
      color:AppColor.PDarkColor,
      fontSize:16,
      justifyContent:'center',
      textAlign:'center'
    }
  });