import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LogInScreen from '../screens/LogInScreen';
import SplashScreen from '../screens/SplashScreen';

const AuthStack = createStackNavigator();

const AuthNavigator = () => (
    <AuthStack.Navigator mode="modal" screenOptions={{headerShown: false}} initialRouteName="SplashScreen">
    <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
    <AuthStack.Screen name="Back" component={LogInScreen} />
    {/*  options={{headerShown: false}} */}
    </AuthStack.Navigator>
);

export default AuthNavigator;