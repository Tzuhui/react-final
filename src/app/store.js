import { configureStore } from '@reduxjs/toolkit';
import messageReducer from '../slice/messageSlice';
// export const store = configureStore({
//   reducer: {},
// });

export default configureStore({
  reducer: {
    message: messageReducer,
  },
});
