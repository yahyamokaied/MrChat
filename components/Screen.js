import React from 'react';
import { StyleSheet,StatusBar, View } from 'react-native';

import * as AppStyle from '../components/AppStyle';
import * as AppColor from '../components/AppColor';

export default Screen = ( {children} ) => {
    return (
        <View style={styles.screen} >
        <StatusBar
        barStyle = "dark-content" 
        hidden = {false}
        translucent = {false}
        backgroundColor={AppColor.SDarkColor}
        />
         {children}
        </View>
          );
};

const styles = StyleSheet.create({
    screen: {
        alignContent:'center',
        justifyContent:'center',
        width: AppStyle.ww,
        height: AppStyle.hh
    }
});
