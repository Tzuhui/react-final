// import axios from 'axios';
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function AuthRouter({ children }) {
  // const userCheck = async () => {
  //   let status;
  //   try {
  //     const res = await axios.post('/v2/api/user/check');
  //     status = res.data.status;
  //   } catch (e) {
  //     status = false;
  //   }
  //   return status;
  // };
  const isAuth = true;
  if (isAuth) {
    return children || <Outlet />;
  }
  return (
    <Navigate
      to={{ pathname: '/login' }}
    />
  );
}

export default AuthRouter;
