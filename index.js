import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './redux/store';

const ReduxApp = () => <Provider store={store}><App /></Provider>

AppRegistry.registerComponent(appName, () => ReduxApp);
