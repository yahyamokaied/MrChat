import AsyncStorage from '@react-native-async-storage/async-storage';

  export const getToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@mrchat_key')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.log(e);
    }
    console.log('Token restored : '+ jsonValue);
  }


  export const setToken = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      console.log(' Token updated. ');
      await AsyncStorage.setItem('@mrchat_key', jsonValue)
    } catch(e) {
      console.log(e);
    }
  }


  export const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('@mrchat_key')
    } catch(e) {
      console.log(e);
    }
    console.log(' Token removed.')
  }