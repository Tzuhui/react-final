import { configureStore } from '@reduxjs/toolkit';
import messageReducer from '../slice/messageSlice';
import { adminApi } from '../services/admin';

export default configureStore({
  reducer: {
    message: messageReducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(adminApi.middleware),
});
