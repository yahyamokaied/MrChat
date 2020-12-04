import Reacr from 'react';
import {Alert} from 'react-native';

export default ShowError = ( errorMessage ) => {
    Alert.alert(errorMessage);
};