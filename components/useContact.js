import React,{ useContext, useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';

import Contacts from 'react-native-contacts';

import AuthContext from '../auth/context';


 const useContact = () => {
const { contacts , setContacts } = useContext(AuthContext);

useEffect(() => {

    getList = async () => {
        Contacts.getAll ( async (err, contacts) => {
            if (err === 'denied') {
                console.log("Cannot access your contacts");
            } else {
                //console.log(contacts)
               await _GetContacts(contacts);
            }
        })
    }

    if (Platform.OS === 'android') {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                title: 'Contacts',
                message: ' MrChat would like to access your contacts to see your friends'
            }
        ).then(() => {
            getList();
        })
    } else if(Platform.OS === 'ios') {
            getList();
    }


    const _GetContacts = async (allcontacts) => {


            var currentContacts = []
            var regex1 = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
            //var regex2 = /^[0-0][0-0]?()[0-9](\s|\S)(\d[0-9]{8,16})$/

            allcontacts.forEach( contact => 
            {

                function getNumber (phone)
                {
                if( Object.keys(phone).length > 0 )
                {

                var removedSpaces = contact.phoneNumbers[0].number.split(" ").join("");
                var removedDashes = removedSpaces.split("-").join("");
                if( removedDashes.startsWith('00') == true )
                { var removedDashes=removedDashes.replace('00', "+") } 
                return removedDashes
                }
                else return 0
                }
                
                
            if( Object.keys(contact.phoneNumbers).length > 0 )
            {
            //if ( regex1.test( getNumber(contact.phoneNumbers) ) == true )
                 // || regex2.test( getNumber(contact.phoneNumbers) ) == true )
            if ( regex1.test( getNumber(contact.phoneNumbers) ) == true )

                 currentContacts.push ({
                    recordID: contact.recordID,
                    givenName: contact.givenName,
                    familyName: contact.familyName,
                    phoneNumber: getNumber(contact.phoneNumbers)
                                })
            }
        }
        );
        function compare( a, b ) {
            if ( a.givenName < b.givenName ){
              return -1;
            }
            if ( a.givenName > b.givenName ){
              return 1;
            }
            if ( a.familyName < b.familyName ){
                return -1;
              }
              if ( a.familyName > b.familyName ){
                return 1;
              }

            return 0;
          }
        currentContacts = currentContacts.sort( compare );

        setContacts(currentContacts);
        //console.log("currentContacts ",currentContacts);
        console.log("currentContacts ",currentContacts.length);
    };

    
},[]);

return contacts;

};


export default useContact;
