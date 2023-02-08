import axios from 'axios';
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

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
  if (token) {
    return (
      children || <Outlet />
    );
  }
  return (
    <Navigate
      to={{ pathname: '/login' }}
    />
  );
}

export default ProtectedRoute;
