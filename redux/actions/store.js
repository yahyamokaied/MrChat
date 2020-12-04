import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';



import authReducer from './reducers/authReducer';
import chatReducer from './reducers/chatReducer';


const rootReducer = combineReducers ({
    auth : authReducer,
    chat : chatReducer
});

export default store = createStore ( rootReducer, applyMiddleware(thunk) );