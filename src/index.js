import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import axios from 'axios';
import 'material-icons/iconfont/material-icons.css';
import './index.css';
import App from './App';
import Login from './pages/Login';
import AdminProducts from './pages/Admin/Products';
import AdminCoupons from './pages/Admin/Coupons';
import AdminOrders from './pages/Admin/Orders';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/js/bootstrap';
import './assets/scss/all.scss';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/products',
    element: <Products />,
  },
  {
    path: '/product/:productId',
    element: <ProductDetail />,
  },
  {
    path: '/cart',
    element: 'cart',
  },
  {
    path: '/admin',
    children: [
      {
        path: 'products',
        element: <AdminProducts />,
      },
      {
        path: 'coupons',
        element: <AdminCoupons />,
      },
      {
        path: 'orders',
        element: <AdminOrders />,
      },
    ],
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
