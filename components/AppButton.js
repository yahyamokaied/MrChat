import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';


import * as AppColor from './AppColor';

export const PButton = ( {children,onPress, ...otherProps} ) => {
    return ( <TouchableOpacity style={styles.pbutton} onPress={onPress} {...otherProps} >
             <Text style={styles.pbuttonText}>{children}</Text>
             </TouchableOpacity> );
    };

export const SButton = ( {children,onPress, ...otherProps} ) => {
    return ( <TouchableOpacity style={styles.sbutton} onPress={onPress} {...otherProps} >
             <Text style={styles.sbuttonText}>{children}</Text>
             </TouchableOpacity> );
    };

const styles = StyleSheet.create({
    pbutton: {        
        width: 250,
        height: 50,
        borderRadius:8,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: AppColor.SDarkColor,
        marginVertical: 14
    },
    pbuttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: AppColor.WhiteColor,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        textAlign:'center',
    },


    sbutton: {        
        width: 150,
        height: 40,
        borderRadius:6,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: AppColor.SLightColor,
        marginVertical: 6
    },
    sbuttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: AppColor.WhiteColor,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        textAlign:'center',
    },

});
