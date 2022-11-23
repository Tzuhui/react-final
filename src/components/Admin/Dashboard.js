import axios from 'axios';
import React from 'react';
import { NavLink, Navigate } from 'react-router-dom';

function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function Dashboard({ children }) {
  const token = getCookie('reactFinalToken');
  axios.defaults.headers.Authorization = token;
  return token ? (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand link-white" href="/">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link link-white active" aria-current="page" href="/">
                  登出
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <div className="bg-light" style={{ width: '200px' }}>
          <ul className="d-flex flex-column list-unstyled my-4">
            <li className="p-2">
              <NavLink className="link-dark" to="/admin/products">
                <span className="material-icons">inventory_2</span>
                {' '}
                產品列表
              </NavLink>
            </li>
            <li className="p-2">
              <NavLink className="link-dark" to="/admin/coupons">
                <span className="material-icons">local_activity</span>
                {' '}
                優惠卷列表
              </NavLink>
            </li>
            <li className="p-2">
              <NavLink className="link-dark" to="/admin/orders">
                {' '}
                <span className="material-icons">receipt_long</span>
                訂單列表
              </NavLink>
            </li>
          </ul>

        </div>
        <div className="w-100">{children}</div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default Dashboard;
