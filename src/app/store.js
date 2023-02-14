import { configureStore } from '@reduxjs/toolkit';
import messageReducer from '../slice/messageSlice';
import { productsApi } from '../services/products';
import { adminApi } from '../services/admin';

export default configureStore({
  reducer: {
    message: messageReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(adminApi.middleware)
    .concat(productsApi.middleware),
});
