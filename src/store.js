import { createContext } from 'react';

export const MessageContext = createContext();

export const initState = {
  messages: {
    type: '',
    title: '',
    text: '',
  },
};

export const messageReducer = (state, action) => {
  switch (action.type) {
    case 'POST_MESSAGE': // dispatch({ type: 'POST_MESSAGE', payload: {type: "success", title: "", text: ""} });
      return {
        ...state,
        messages: {
          ...action.payload,
        },
      };
    case 'CLEAR_MESSAGE': // dispatch({ type: 'CLEAR_MESSAGE'});
      return {
        ...state,
        messages: {
          type: '',
          title: '',
          text: '',
        },
      };
    default:
      return state;
  }
};

export const handleSuccessMessage = (res, dispatch) => {
  dispatch({ type: 'POST_MESSAGE', payload: { type: 'success', title: `${res.status}: 成功`, text: res.data.message } });
  setTimeout(() => {
    dispatch({ type: 'CLEAR_MESSAGE' });
  }, 3000);
};

export const handleErrorMessage = (error, dispatch) => {
  dispatch({ type: 'POST_MESSAGE', payload: { type: 'error', title: error?.response?.status, text: error?.response?.data?.message } });
  setTimeout(() => {
    dispatch({ type: 'CLEAR_MESSAGE' });
  }, 5000);
};
