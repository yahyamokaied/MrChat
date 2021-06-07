import React, { useEffect } from 'react';
import { LogBox, I18nManager, StatusBar } from 'react-native';
import { AppColor } from './components';

import { NavigationContainer } from '@react-navigation/native';
import NavigationTheme from './navigation/NavigationTheme';
import HomeNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';

import { useSelector, useDispatch } from 'react-redux';
import { setUser, setUserStatus, setUserLastSeen, FetchUserData, FetchContacts } from './redux/actions';
import * as AuthStorage from "./auth/AuthStorage";

import RNBootSplash from "react-native-bootsplash";


LogBox.ignoreAllLogs();

// App

const App = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const contactsActive = useSelector(state => state.auth.contactsActive);


  useEffect(() => {
    const init = async () => {
      try {
        I18nManager.allowRTL(false);
        dispatch(FetchUserData());
        dispatch(setUserStatus());
        dispatch(setUserLastSeen());
        restoreToken();
      }
      catch (error) {
        console.log('App error :', error);
      }
    };
    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
      console.log("Bootsplash has been hidden successfully");
    });
  }, []);


  const restoreToken = async () => {
    const token = await AuthStorage.getToken();
    if (!token) console.log(" Token is null.");
    if (token) {
      dispatch(FetchContacts());
    }
    dispatch(setUser(token));
    console.log(" Token restored.");
  }


  return (
    <NavigationContainer theme={NavigationTheme} >
      <StatusBar
        backgroundColor={AppColor.SLightColor}
        barStyle="light-content"
      />
      { user ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default App;
