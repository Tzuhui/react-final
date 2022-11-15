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
      }; default:
      return state;
  }
};
