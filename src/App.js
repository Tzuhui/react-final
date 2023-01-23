import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import AdminProducts from './pages/Admin/Products';
import AdminCoupons from './pages/Admin/Coupons';
import AdminOrders from './pages/Admin/Orders';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/Admin/Dashboard';
import Orders from './pages/Orders';
import Success from './pages/Success';
import ErrorPage from './components/ErrorPage';
import Checkout from './pages/Checkout';
import Cart from './components/Orders/Cart';
import FrontLayout from './pages/FrontLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:productId" element={<ProductDetail />} />
        <Route path="/orders" element={<Orders />}>
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Route>
      <Route path="/order/:orderId" element={<Success />} />
      <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
      <Route path="/admin" element={<Dashboard />}>
        <Route path="products" element={<AdminProducts />} />
        <Route path="coupons" element={<AdminCoupons />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>
    </Routes>
  );
}

export default App;
