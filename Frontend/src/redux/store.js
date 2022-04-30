import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
