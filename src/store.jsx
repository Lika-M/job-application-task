import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './features/auth/authSlice';
import { authApi } from './features/auth/authApiSlice';

import questionnaireReducer from './features/questionnaires/questionnaireSlice';
import { questionnaireApi } from './features/questionnaires/questionnaireApi';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  [questionnaireApi.reducerPath]: questionnaireApi.reducer,
  questionnaires: questionnaireReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, questionnaireApi.middleware)
});

export const persistor = persistStore(store);
