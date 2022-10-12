import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './pages/Login';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/js/bootstrap';
import './assets/scss/all.scss';

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
    element: 'products',
  },
  {
    path: '/cart',
    element: 'cart',
  },
  {
    path: '/admin',
    element: '',
    children: [
      {
        path: 'products',
        element: '',
      },
      {
        path: 'coupons',
        element: '',
      },
      {
        path: 'orders',
        element: '',
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
