import * as ActionTypes from '../actions/ActoinTypes';

initalState = {

isLoading1: false,
conversationsLength: 0,
allConversations: {},
chatLength: 0,
allChat: {},
vibesLength: 0,
blockedUsers: []
};

function chatReducer (state = initalState, action) {
    switch (action.type) {

        case ActionTypes.SET_BLOCKED_USERS :
            return {
        ...state,
        blockedUsers: action.payload.blockedUsers
           };

           case ActionTypes.SET_STARTLOADING :
            return {
        ...state,
        isLoading1: true
           };
           case ActionTypes.SET_STOPLOADING :
            return {
        ...state,
        isLoading1: false
           };

           case ActionTypes.SET_CONVERSATIONS_LENGTH :
            return {
        ...state,
        conversationsLength: action.payload.conversationsLength
           };
    
           case ActionTypes.SET_CONVERSATIONS :
            return {
        ...state,
        allConversations: action.payload.allConversations
           };

           case ActionTypes.SET_CHAT_LENGTH :
            return {
        ...state,
        chatLength: action.payload.chatLength
           };

           case ActionTypes.SET_CHAT :
            return {
        ...state,
        allChat: action.payload.allChat
           };

           case ActionTypes.SET_VIBES_LENGTH :
            return {
        ...state,
        vibesLength: action.payload.vibesLength
           };

           
           default:
            return state;
    }
    };
    
    export default chatReducer;