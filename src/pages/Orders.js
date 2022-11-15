import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Cart from '../components/Orders/Cart';
import OrderForm from '../components/Orders/OrderForm';

function Orders() {
  const [state, setState] = useState({
    nowPage: 1,
    cartLength: 0,
    carts: [],
    final_total: 0,
    total: 0,
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
    }));
  };
  useEffect(() => {
    getCart();
  }, []);
  const changePage = (page = 1) => {
    setState((prev) => ({ ...prev, nowPage: page }));
  };
  const postCoupon = (code) => {
    axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/coupon`, { data: { code } }).then((res) => {
      if (res.data.success) {
        getCart();
      }
    });
  };
  return (
    <div>
      <Header />
      <nav className="bg-light p-0">
        <div className="container">
          <ul className="nav nav-pills nav-fill checkProgress">
            <li className={`nav-item text-light p-2 text-dark ${state.nowPage === 1 && 'bg-dark text-white'}`}>購物車清單</li>
            <li className={`nav-item text-light p-2 text-dark ${state.nowPage === 2 && 'bg-dark text-white'}`}>填寫訂單資訊</li>
          </ul>
        </div>
      </nav>
      <div className="my-4">
        {
        state.nowPage === 1 && (
        <Cart
          postCoupon={postCoupon}
          carts={state.carts}
          total={state.total}
          finalTotal={state.final_total}
          changePage={changePage}
        />
        )
      }
        {
        state.nowPage === 2 && (
        <OrderForm
          carts={state.carts}
          total={state.total}
          finalTotal={state.final_total}
          changePage={changePage}
        />
        )
      }
      </div>
    </div>
  );
}

export default Orders;
