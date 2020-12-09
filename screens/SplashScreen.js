import React,{ useEffect } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';

import * as AppColor from '../components/AppColor';

const {width} = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {

    const position = new Animated.Value(0);

  useEffect(() => {
      Animated.timing(position, {
      toValue: 100,
      duration : 900,
      useNativeDriver: true,
      delay: 500
      }).start();
      hideSplash();
  },[]);


  function hideSplash() {
      setTimeout(() => {
      navigation.navigate("Back");
      },1200);
  }

  const imageScale = {
      transform: [
      {
      scale: position.interpolate({
      inputRange: [70, 80, 100],
      outputRange: [0.1, 0.02, 10]
      })
      }
      ]
  };

  const opacity = {
      opacity: position.interpolate({
      inputRange: [1, 25, 40],
      outputRange: [0.7, 2, 1.2]
      })
  }
  

return (
  <View style={{ flex: 1 }}>
    <View style={styles.centered}>
      <Animated.Image source={require("../assets/splash-logo.png")}
      style={[{width: width/1.1}, imageScale, opacity]}
        resizeMode="contain"/>
    </View>
  </View>
);
};


export default SplashScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:AppColor.SLightColor
  }
});