//import * as AppText from './components/AppText';
import { Dimensions } from 'react-native';

const ww = Dimensions.get('window').width;
const hh = Dimensions.get('window').height;

import React from 'react';
import { StyleSheet, Platform, Text } from 'react-native';

import * as AppColor from './AppColor';

export const PHeadText = ( {children} ) => {
    return ( <Text style={styles.pheadtext}>{children}</Text> );
};

export const PBoldText = ( {children} ) => {
    return ( <Text style={styles.pboldtext}>{children}</Text> );
};

export const PMediumText = ( {children} ) => {
    return ( <Text style={styles.pmediumtext}>{children}</Text> );
};

export const PNormalText = ( {children} ) => {
    return ( <Text style={styles.pnormaltext}>{children}</Text> );
};

export const PSmallText = ( {children} ) => {
    return ( <Text style={styles.psmalltext}>{children}</Text> );
};



export const SHeadText = ( {children} ) => {
    return ( <Text style={styles.sheadtext}>{children}</Text> );
};

export const SBoldText = ( {children} ) => {
    return ( <Text style={styles.sboldtext}>{children}</Text> );
};

export const SMediumText = ( {children} ) => {
    return ( <Text style={styles.smediumtext}>{children}</Text> );
};

export const SNormalText = ( {children} ) => {
    return ( <Text style={styles.snormaltext}>{children}</Text> );
};

export const SSmallText = ( {children,onPress} ) => {
    return ( <Text style={styles.ssmalltext} onPress={onPress}>{children}</Text> );
};


export const LGrayText = ( {children} ) => {
    return ( <Text style={styles.lgraytext}>{children}</Text> );
};

export const LWhiteText = ( {children} ) => {
    return ( <Text style={styles.lwhitetext}>{children}</Text> );
};



export const PNormalLeftText = ( {children} ) => {
    return ( <Text style={styles.pnormallefttext}>{children}</Text> );
};

export const SNormalLeftText = ( {children} ) => {
    return ( <Text style={styles.snormallefttext}>{children}</Text> );
};

const styles = StyleSheet.create({
    pheadtext: {        
        fontSize: ww / 18,
        color: AppColor.PDarkColor,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        fontWeight: 'bold',
        alignSelf:'center',
        marginVertical: 1
    },
    pboldtext: {        
        fontSize:  ww / 22,
        color: AppColor.PDarkColor,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        fontWeight: 'bold',
        alignSelf:'center',
        marginVertical: 1
    },
    pmediumtext: {
        fontSize:  ww / 26,
        color:AppColor.PDarkColor,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        alignSelf:'center',
        marginVertical: 1
    },
    pnormaltext: {        
        fontSize:  ww / 30,
        color:AppColor.PDarkColor,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        alignSelf:'center',
        marginVertical: 1
    },
    psmalltext: {        
        fontSize:  ww / 32,
        color:AppColor.PDarkColor,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        fontWeight:'normal',
        alignSelf:'center',
        marginVertical: 1
    },


    sheadtext: {        
        fontSize:  ww / 18,
        color: AppColor.SDarkColor,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        fontWeight: 'bold',
        alignSelf:'center',
        marginVertical: 1
    },
    sboldtext: {        
        fontSize:  ww / 22,
        color: AppColor.SDarkColor,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        fontWeight: 'bold',
        alignSelf:'center',
        marginVertical: 1
    },
    smediumtext: {
        fontSize:  ww / 26,
        color:AppColor.SDarkColor,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        fontWeight:'bold',
        alignSelf:'center',
        marginVertical: 1
    },
    snormaltext: {        
        fontSize:  ww / 30,
        color:AppColor.SDarkColor,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        fontWeight:'normal',
        alignSelf:'center',
        marginVertical: 1
    },
    ssmalltext: {        
        fontSize:  ww / 32,
        color:AppColor.SDarkColor,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        fontWeight:'normal',
        alignSelf:'center',
        marginVertical: 1
    },



    lgraytext: {        
        fontSize:  ww / 36,
        color:AppColor.LightGrayColor,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        fontWeight:'normal',
        alignSelf:'center',
        marginVertical: 2
    },

    lwhitetext: {        
        fontSize:  ww / 32,
        color:AppColor.WhiteColor,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        fontWeight:'normal',
        alignSelf:'center',
        marginVertical: 1
    },
    pnormallefttext: {        
        fontSize:  ww / 30,
        color:AppColor.PDarkColor,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        alignSelf:'flex-start',
        marginVertical: 1
    },
    snormallefttext: {        
        fontSize:  ww / 26,
        color:AppColor.SDarkColor,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        fontWeight:'normal',
        alignSelf:'flex-start',
        marginVertical: 1
    },

});
