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
import ProtectedRoute from './pages/Admin/ProtectedRoute';
import AdminProducts from './pages/Admin/Products';
import AdminCoupons from './pages/Admin/Coupons';
import AdminOrders from './pages/Admin/Orders';
import reportWebVitals from './reportWebVitals';
import './assets/scss/all.scss';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Orders from './pages/Orders';
import Success from './pages/Success';
import ErrorPage from './components/ErrorPage';
import Checkout from './pages/Checkout';
import Cart from './components/Orders/Cart';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
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
    path: '/orders',
    element: <Orders />,
    children: [
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
    ],
  },
  {
    path: '/order/:orderId',
    element: <Success />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
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

// export default ErrorPage;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
