// store.js
import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./Userslice";


const rootReducer = combineReducers({
  user: userReducer,
  
});

const persistConfig = { key: "root", storage: AsyncStorage, whitelist: ['user'] };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
