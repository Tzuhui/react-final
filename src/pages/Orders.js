import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Loading from '../components/Loading';
import OrderStep from '../components/OrderStep';
import { useGetCartQuery } from '../services/products';

function Orders() {
  const [state, setState] = useState({
    nowPage: 1,
    cartLength: 0,
    carts: [],
    final_total: 0,
    total: 0,
    loading: false,
  });
  const { data: carts, isLoading } = useGetCartQuery();
  useEffect(() => {
    if (carts && carts?.data) {
      const cartData = carts.data;
      setState((prev) => ({
        ...prev,
        cartLength: cartData.carts.length,
        carts: cartData.carts,
        final_total: cartData.final_total,
        total: cartData.total,
      }));
    }
  }, [carts]);

  return (
    <div>
      <nav className="bg-light p-0">
        <div className="container">
          <OrderStep />
        </div>
      </nav>
      <div className="position-relative">
        {
          isLoading && <Loading />
        }
        <div className="my-4">
          {
            state.carts.length ? (
              <Outlet context={{
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
