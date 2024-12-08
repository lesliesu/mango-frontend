import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

const configureAppStore = (initialState = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
  });

  return store;
};

export const store = configureAppStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
