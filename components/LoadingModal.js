import React from "react";
import { View, Modal, ActivityIndicator } from 'react-native';

import * as AppColor from './AppColor';
import * as AppStyle from './AppStyle';

export default LoadingModal  = ({loading}) => {


return (
  <Modal
  animationType={'fade'}
  transparent={true}
  visible={loading}
  onRequestClose={() => {
    alert('closed');
  }}
>
  <View
  style={{
    width: AppStyle.ww,
    height: AppStyle.hh,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'rgba(242,148,132,0.1)',
  }} >
    
  {
    <View
    style={{
      width: '100%',
      height: '100%',
      justifyContent:'center',
      alignItems:'center',
    }} >
    
    <ActivityIndicator size='large' color={AppColor.PDarkColor}/>
    </View>
  }
    
  </View>
  </Modal>
  );
};