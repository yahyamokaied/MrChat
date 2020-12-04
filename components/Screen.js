import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar, View,Dimensions } from 'react-native';

import * as AppStyle from '../components/AppStyle';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default Screen = ( {children} ) => {
    return (
        <View style={styles.screen} >
        <StatusBar
        barStyle = "dark-content" 
        hidden = {false}
        translucent = {false}
        />
         {children}
        </View>
          );

/*           return ( <SafeAreaView style={styles.screen}>
            <View>{children}</View>
            </SafeAreaView>
         ); */
};

const styles = StyleSheet.create({
    screen: {
        alignContent:'center',
        justifyContent:'center',
        width: AppStyle.ww,
        height: AppStyle.hh
    }
});
