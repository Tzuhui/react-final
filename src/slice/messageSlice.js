import { createSlice } from '@reduxjs/toolkit';

const message = {
  type: '',
  title: '',
  text: '',
};

export const messageSlice = createSlice({
  name: 'counter',
  initialState: message,
  reducers: {
    clearMessage: () => ({
      type: '',
      title: '',
      text: '',
    }),
    handleSuccessMessage: (state, action) => {
      const status = action.payload.success;
      return {
        type: status ? 'success' : 'error',
        title: status ? '成功' : '出現錯誤',
        text: action.payload.message,
      };
    },
    handleErrorMessage: (state, action) => {
      const response = action.payload?.response?.data;
      return {
        type: 'error',
        title: '出現錯誤',
        text: response.message,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleSuccessMessage, handleErrorMessage, clearMessage } = messageSlice.actions;

export default messageSlice.reducer;
