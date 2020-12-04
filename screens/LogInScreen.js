import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Linking} from 'react-native';

import {
  Screen, AppButton, AppColor, AppStyle, AppText, AppTextInput, ShowError,
} from '../components';

import {useSelector, useDispatch} from 'react-redux';
import { signIn, ConfirmCode, setResult,startLoading1,stopLoading1} from '../redux/actions';

import FastImage from 'react-native-fast-image';

const LogInScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const isLoading1 = useSelector(state => state.chat.isLoading1);
    const confirmResult = useSelector(state => state.auth.confirmResult);

    const isValidPhone = (phone) => {
        var regex1 = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        var regex2 = /^[0-0][0-0]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        if (regex2.test( phone ) == true || regex1.test( phone ) == true )
        return true;
        return false;
    };

    const updatePhone = (phone) => {
        dispatch(startLoading1());            
        var newPhone = phone.split(" ").join("");
        if( newPhone.startsWith('00') == true )
        { newPhone = newPhone.replace('00', "+") }
        dispatch(stopLoading1());
        return newPhone;
    };

    const handleSendCode = ( phone ) => {
        dispatch(startLoading1());            
        if (isValidPhone(phone))
        {
        setPhone( updatePhone(phone) );
        // redux thunk login function
        dispatch( signIn( updatePhone(phone) ) );
        }
        else ShowError("Phone number entered not valid")
        dispatch(stopLoading1());
    };

    const handleConfirmCode = ( confirmResult, code ) => {
        dispatch(startLoading1());            
        if (code.length == 6) dispatch( ConfirmCode( confirmResult, code ) );
        else ShowError("Invalid code .. 6 numbers at least")
        dispatch(stopLoading1());
    }

    const handleChangePhone = () => {
        dispatch(startLoading1());            
        dispatch( setResult( null ) );
        setPhone('');
        dispatch(stopLoading1());
    }

    const handleSendCodeAgain = (phone) => {
        dispatch(startLoading1());            
        handleSendCode(phone)
        setCode('');
        dispatch(stopLoading1());
    }

    const openEULA = async () => {
      console.log('openEULA pressed')
      const url = "https://apptry.godaddysites.com/eula-terms";
      await Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    const openTerms = async () => {
      const url = "https://apptry.godaddysites.com/terms-of-service";
      await Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    const openPolicy = async () => {
      const url = "https://apptry.godaddysites.com/privacy-policy";
      await Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

  if (!confirmResult)
  {
      return (
      <Screen>
      <LoadingModal loading={isLoading1} />
      <View style={styles.container}>
      <AppText.SBoldText>Thanks!</AppText.SBoldText>
      <AppText.PSmallText>for choosing our community</AppText.PSmallText>
      <FastImage
              style={styles.img}
              source={require("../assets/logo.png")}
          />
      <AppText.PNormalText>Rigester / Login with Phone Number</AppText.PNormalText>
      <AppTextInput
      placeholder="Ex:0046731230123" icon="phone-portrait-outline"
                    placeholderTextColor={AppColor.LightGrayColor} width={280} 
                    maxLength={17} returnKeyType="done" value={phone} 
                    onChangeText={TextInputMessage => setPhone(TextInputMessage)}
                    autoCapitalize="none" autoCorrect={false} keyboardType="phone-pad" />
      <AppText.LGrayText>Carrier SMS may charges apply</AppText.LGrayText>
      <AppButton.PButton
      onPress={() => handleSendCode(phone)}
      >Agree and continue</AppButton.PButton>
      <AppText.PSmallText>by clicking on Agree and continue you agree :</AppText.PSmallText>
      <View style={styles.btns}>
        <AppText.SSmallText onPress={() => { openEULA() }}> EULA Terms </AppText.SSmallText>
        <AppText.PNormalText> - </AppText.PNormalText>
        <AppText.SSmallText onPress={() => { openPolicy() }}> Privacy Policy </AppText.SSmallText>
        <AppText.PNormalText> - </AppText.PNormalText>
        <AppText.SSmallText onPress={() => { openTerms() }}> Terms of Service </AppText.SSmallText>
      </View>



      </View>
      </Screen>
      );
  }

  return (
      <Screen>
          <LoadingModal loading={isLoading1} />

          <View style={styles.container2}>
          <FastImage
          style={styles.verifyimg}
          source={require("../assets/logo.png")}
          />
          <AppText.SHeadText>* Verify *</AppText.SHeadText>
          <AppText.PBoldText>{phone}</AppText.PBoldText>
          <TouchableOpacity onPress={() => handleChangePhone() }>
          <AppText.SSmallText>wrong?</AppText.SSmallText>
          </TouchableOpacity>
          <AppText.PNormalText>We have sent an SMS with 6 digits verification code</AppText.PNormalText>
          <AppTextInput placeholder="6 digits" placeholderTextColor={AppColor.LightGrayColor}
            width={130} maxLength={6} returnKeyType="done" icon="mail-open-outline"
            autoCapitalize="none" autoCorrect={false} keyboardType="number-pad"
            value={code} onChangeText={text => setCode(text)}/>
          <AppButton.SButton onPress={() => handleConfirmCode (confirmResult,code)} >Confirm Code</AppButton.SButton>
          <TouchableOpacity onPress={() =>   handleSendCodeAgain(phone) }>
          <AppText.SSmallText>Resend SMS</AppText.SSmallText>
          </TouchableOpacity>
          </View>
      </Screen>
  );
  };

export default LogInScreen;


const styles = StyleSheet.create({
  container: {
    marginTop:AppStyle.PageStart,
    width:AppStyle.ww,
    height:AppStyle.hh,
    flex:1
},
container2: {
  marginTop:AppStyle.PageStart,
  width:AppStyle.ww,
  height:AppStyle.hh,
  flex:1
},
  img: {
    width: AppStyle.ww / 2,
    height: AppStyle.hh / 7.5,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginVertical: AppStyle.ww / 40,
  },
  verifyimg: {
    width: AppStyle.ww / 2,
    height: AppStyle.hh / 7.5,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginVertical: AppStyle.ww / 20,
  },
  btns:{
    flexDirection:'row',
    justifyContent:'center',
  }
});