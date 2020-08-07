import {combineReducers} from "redux";
import {  persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


import userReducer from './user/user-reducer'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    user: userReducer
})



const persistedReducer = persistReducer(persistConfig, rootReducer)
export default persistedReducer;