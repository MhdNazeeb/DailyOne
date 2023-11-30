// store.js
import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./Userslice";
import CartReducer from "./CartSlice";
import ProductReducer from "./ProductSlice";
import datePickUpReducer from './PickUp'


const rootReducer = combineReducers({
  user: userReducer,
  cart:CartReducer,
  product:ProductReducer,
  datePickUp:datePickUpReducer
  
});

const persistConfig = { key: "root", storage: AsyncStorage, whitelist: ['user'] };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
