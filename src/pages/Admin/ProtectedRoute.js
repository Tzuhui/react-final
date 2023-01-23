import axios from 'axios';
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { MessageContext, messageReducer, initState } from '../../store';
import Message from '../../components/Message';

function getCookie(name) {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
  return cookieValue;
}

function ProtectedRoute({ children }) {
  const token = getCookie('reactFinalToken');
  axios.defaults.headers.Authorization = token;
  const reducer = React.useReducer(messageReducer, initState);
  if (token) {
    return (
      <MessageContext.Provider value={reducer}>
        <Message />
        {children || <Outlet />}
      </MessageContext.Provider>
    );
  }
  return (
    <Navigate
      to={{ pathname: '/login' }}
    />
  );
}

export default ProtectedRoute;
