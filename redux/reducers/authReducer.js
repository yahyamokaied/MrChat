import * as ActionTypes from '../actions/ActoinTypes';


initalState = {
    user: null,
    user2: null,
    userData: null,
    photoURL: null,
    contacts: null,
    isLoading: false,
    signInDone: null,
    signInError: null,
    confirmResult: null,
    codeConfirmDone: null,
    codeConfirmError: null,
    firstTime: false,
    userStatus: 'offline',
    userLastSeen: null,
    fcmToken : null,

    contactsActive:false,

};

function authReducer (state = initalState, action) {
switch (action.type) {

       case ActionTypes.SET_USER :
        return {
    ...state,
    user: action.payload.user
        };

        case ActionTypes.SET_USER2 :
            return {
        ...state,
        user2: action.payload.user2
            };

            case ActionTypes.SET_CONTACTS_ACTIVE :
                return {
            ...state,
            contactsActive: true
                };

        case ActionTypes.SET_USERDATA :
            return {
        ...state,
        userData: action.payload.userData
            };

        case ActionTypes.SET_USERPHOTO :
            return {
        ...state,
        photoURL: action.payload.photoURL
            };

            case ActionTypes.SET_STATUS :
                return {
            ...state,
            userStatus: action.payload.userStatus
                };

            case ActionTypes.SET_LASTSEEN :
                return {
            ...state,
            userLastSeen: action.payload.userLastSeen
                };

            case ActionTypes.SET_CONTACTS :
                return {
            ...state,
            contacts: action.payload.contacts
                };

            case ActionTypes.SET_RESULT :
                return {
            ...state,
            confirmResult: action.payload.confirmResult
               };

       case ActionTypes.SET_STARTLOADING :
        return {
    ...state,
    isLoading: true
       };

       case ActionTypes.SET_STOPLOADING :
        return {
    ...state,
    isLoading: false
       };

       case ActionTypes.SET_SIGNINDONE :
        return {
    ...state,
    signInDone: {}
       };

       case ActionTypes.SET_SIGNINERROR :
        return {
    ...state,
    signInError: {}
       };


       case ActionTypes.SET_CODECONFIRMATIONDONE :
        return {
    ...state,
    codeConfirmDone: {}
       };

       case ActionTypes.SET_CODECONFIRMATIONERROR :
        return {
    ...state,
    codeConfirmError: {}
       };

       case ActionTypes.SET_FIRSTTIMESTART :
        return {
    ...state,
    firstTime: true
       };

       case ActionTypes.SET_FIRSTTIMESTOP :
        return {
    ...state,
    firstTime: false
       };

       case ActionTypes.SET_FCM_TOKEN :
        return {
    ...state,
    fcmToken: action.payload.fcmToken
       };

       default:
        return state;
}
};

export default authReducer;