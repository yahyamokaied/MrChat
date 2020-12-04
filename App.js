import React,{ useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationTheme from './navigation/NavigationTheme';
import HomeNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setUserStatus ,setUserLastSeen, FetchUserData, FetchContacts } from './redux/actions';
import * as AuthStorage from "./auth/AuthStorage";
import { LogBox, I18nManager} from 'react-native';

LogBox.ignoreAllLogs();

const App = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const contactsActive = useSelector(state => state.auth.contactsActive);

useEffect(() => {

try { 
  I18nManager.allowRTL(false);
  dispatch ( FetchUserData () );
  dispatch ( setUserStatus () );
  dispatch ( setUserLastSeen () );
  restoreToken();
} 
catch (error)
{
  console.log('App error :',error);
}
},[]);


const restoreToken = async () => {
    const token = await AuthStorage.getToken();
    if(!token) console.log(" Token is null.");

    if(token)
    {
        dispatch ( FetchContacts () );
    }

    dispatch(setUser(token));
    console.log(" Token restored.");
}


return (
  <NavigationContainer theme={ NavigationTheme } >
    { user ? <HomeNavigator /> : <AuthNavigator /> }
  </NavigationContainer>
);    
};

export default App;
