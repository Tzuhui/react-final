import axios from 'axios';
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function ProtectedRoute({ children }) {
  const token = getCookie('reactFinalToken');
  axios.defaults.headers.Authorization = token;

  if (token) {
    return children || <Outlet />;
  }
  return (
    <Navigate
      to={{ pathname: '/login' }}
    />
  );
}

export default ProtectedRoute;
