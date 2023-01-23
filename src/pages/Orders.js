import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Loading from '../components/Loading';
import OrderStep from '../components/OrderStep';

function Orders() {
  const [state, setState] = useState({
    nowPage: 1,
    cartLength: 0,
    carts: [],
    final_total: 0,
    total: 0,
    loading: false,
  });
  const getCart = async () => {
    const res = await axios(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`);
    const d = res.data.data;
    setState((prev) => ({
      ...prev,
      cartLength: d.carts.length,
      carts: d.carts,
      final_total: d.final_total,
      total: d.total,
      loading: false,
    }));
  };

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    getCart();
  }, []);

  return (
    <div>
      <Header />
      <nav className="bg-light p-0">
        <div className="container">
          <OrderStep />
        </div>
      </nav>
      <div className="position-relative">
        {
          state.loading && <Loading />
        }
        <div className="my-4">
          {
            state.carts.length ? (
              <Outlet context={{
                getCart,
                carts: state.carts,
                total: state.total,
                finalTotal: state.final_total,
              }}
              />
            ) : (
              <div className="text-center">
                購物車沒有商品
                <br />
                <Link to="/products" className="btn btn-outline-dark">返回購物</Link>
              </div>
            )
          }

        </div>
      </div>
    </div>
  );
}

export default Orders;
