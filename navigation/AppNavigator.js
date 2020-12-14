import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {
  AppColor, Icon
}
from '../components';

import SplashScreen from '../screens/SplashScreen';
import MainScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ContactScreen from '../screens/ContactScreen';
import ChatScreen from '../screens/ChatScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => (
    <Tab.Navigator mode="modal" screenOptions={{headerShown: false}} initialRouteName="Chats">

    <Tab.Screen name="Profile" component={ProfileScreen}
    options={{ tabBarIcon: ({color,size}) =>
    <Icon name="options-outline" color={color} size={size}/>
            }}/>

<Tab.Screen name="Chats" component={MainScreen}
    options={{ tabBarIcon: ({color,size}) =>
    <Icon name="chatbubble-ellipses-outline" color={color} size={size}/>
            }}/>

    <Tab.Screen name="Friends" component={ContactScreen}
    options={{ tabBarIcon: ({color,size}) =>
    <Icon name="person-add-outline" color={color} size={size}/>
            }}/>

  </Tab.Navigator>
);


export default HomeNavigator = () => (
  <Stack.Navigator mode="card" screenOptions={{headerShown:false}} initialRouteName="SplashScreen">
    <Stack.Screen name="SplashScreen" component={SplashScreen} />
    <Stack.Screen name="Back" component={AppNavigator} />
    <Stack.Screen name="Chat" options={{headerShown:true}} component={ChatScreen} />
  </Stack.Navigator>
);


const styles = StyleSheet.create({
    icon:{
      fontSize:32,
      color:AppColor.SLightColor,
      padding: 2,
      margin:2,
    },
    tabbar: {
      height:125
    }
  });
