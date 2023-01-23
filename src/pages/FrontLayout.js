import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function FrontLayout() {
  const [state, setState] = useState({
    cartLength: 0,
    carts: [],
  });
  const getCart = async () => {
    const res = await axios(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`);
    setState({
      cartLength: res.data.data.carts.length,
      carts: res.data.data.carts,
    });
  };

  return (
    <>
      <Navbar getCart={getCart} state={state} />
      <Outlet context={{ getNavbarCart: getCart }} />
    </>
  );
}

export default FrontLayout;
