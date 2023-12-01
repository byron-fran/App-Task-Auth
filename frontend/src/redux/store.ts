import {configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import userReducer from './slices/UserSlice'
import thunk from 'redux-thunk';
import errorsReducer from './slices/ErrorSlices';

const store  = configureStore({
  reducer : {
    tasks : taskReducer,
    user : userReducer,
    errors : errorsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;