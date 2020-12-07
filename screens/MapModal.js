import React, { useEffect,useState } from "react";
import { Modal, StyleSheet, View } from "react-native";

import {
  AppButton, AppColor, AppStyle, AppText, Icon
} from '../components';

import { apiKey } from '../Setup';

import {useSelector, useDispatch} from 'react-redux';
import { setLocationStop,sendMessage } from '../redux/actions';

import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import RNLocation from 'react-native-location';

import Geocoder from 'react-native-geocoding';

RNLocation.configure({
    distanceFilter: 5.0
  })


export default MapModal = () => {

  const dispatch = useDispatch();

  const isLocation = useSelector(state => state.chat.isLocation);
  const userData = useSelector(state => state.auth.userData);
  const user2 = useSelector(state => state.auth.user2);

  const [location, setLocation] = useState({latitude:0,longitude:0});
  const [address, setAddress] = useState();

  useEffect(() => {
    if(isLocation)
        getLocation();
  },[isLocation]);

  
  const getLocation = () => {

    RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse"
        }
      }).then(granted => {
          if (granted) {
            RNLocation.getLatestLocation({ timeout: 1000 })
            .then(latestLocation => {
              // Use the location here
              setLocation({
                longitude:latestLocation.longitude,
                latitude:latestLocation.latitude,
              })
              getAddress (latestLocation.latitude,latestLocation.longitude);
            })
          }
        })

  };

const getAddress = async ( lat,lng ) => {
  Geocoder.init(apiKey);

    Geocoder.from({lat,lng})
		.then(json => {
            var addressComponent = json.results[0].formatted_address;
            setAddress(addressComponent);
			      console.log(addressComponent);
		})
		.catch(error => console.log("error getAddress",error));

};


const sendLocation = () => {

  dispatch ( sendMessage( userData.uid, userData.phoneNumber, userData.displayName, user2.phoneNumber, user2.userName,
    ["mylocation",location.latitude,location.longitude,address]
    ) )
    dispatch ( setLocationStop () )
};


  return (
    <Modal
    animationType="fade"
    transparent={true}
    visible={isLocation}
    >
    <View style={styles.centeredView}>
    <View style={styles.modalView}>
    <Icon name="close-circle" style={styles.icon} onPress={() =>  dispatch( setLocationStop() ) }/>

    <View style={styles.mapview}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: location.latitude,
         longitude: location.longitude,
         latitudeDelta: 0.001,
         longitudeDelta: 0.002,
       }}
       ref= {ref => map = ref}
        showsUserLocation={true}
        showsMyLocationButton={true}
    >
    <Marker 
    coordinate={{
      latitude: location.latitude,
      longitude: location.longitude
      }}
      image={require('../assets/pin.png')}
      title="Marker"
      description="Description"
    >

<Callout tooltip>
  <View>
    <View style={styles.bubble}>
    <AppText.PSmallText>{address}</AppText.PSmallText>
    </View>
    <View style={styles.arrowborder}/>
    <View style={styles.arrow}/>
  </View>
</Callout>
   </Marker>
   </MapView>
   </View>
   <AppText.SSmallText>{address}</AppText.SSmallText>
<AppButton.PButton onPress={() => sendLocation()}>Send Your Location</AppButton.PButton>
   </View>
   </View>
    </Modal>
  );
  };

const styles = StyleSheet.create ({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop:AppStyle.PageStart,
    backgroundColor:'rgba(100,100,100,0.5)',
  },
  modalView: {
    backgroundColor: AppColor.WhiteColor,
    width: AppStyle.ww / 1.2,
    height:AppStyle.hh / 1.3,
    borderRadius: AppStyle.ww / 14,
    alignItems: "center",
    shadowColor: AppColor.DarkGrayColor,
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: AppStyle.ww / 1.2,
    width: AppStyle.ww / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50
   },
   icon:{
     color:AppColor.OfflineColor,
     fontSize:AppStyle.IconSize,
     marginVertical:5,
     alignSelf:'flex-end',
     paddingEnd:15
   },
  mapview:{
    width:'100%',
    height:'75%',
    marginBottom: 8
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor:AppColor.WhiteColor,
    flexDirection:'column',
    borderRadius:6,
    borderColor:AppColor.PDarkColor,
    borderWidth:0.5,
    padding:10
  },
  arrow: {
    backgroundColor:'transparent',
    borderColor:'transparent',
    borderTopColor:AppColor.WhiteColor,
    borderWidth: 16,
    alignSelf:'center',
    marginTop:-33
  },
  arrowborder: {
    backgroundColor:'transparent',
    borderColor:'transparent',
    borderTopColor:AppColor.PDarkColor,
    borderWidth: 16,
    alignSelf:'center',
    marginTop:-0.6
  }
});

