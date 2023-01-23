import React from 'react';
import { useLocation } from 'react-router-dom';

function OrderStep() {
  const location = useLocation();
  return (
    <ul className="nav nav-pills nav-fill checkProgress">
      <li
        className={`nav-item text-light p-2 text-dark ${
          location.pathname === '/orders/cart' && 'bg-dark text-white'
        }`}
      >
        購物車清單
      </li>
      <li
        className={`nav-item text-light p-2 text-dark ${
          location.pathname === '/orders/checkout' && 'bg-dark text-white'
        }`}
      >
        填寫訂單資訊
      </li>
    </ul>
  );
}

export default OrderStep;
