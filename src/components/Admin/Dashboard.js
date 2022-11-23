import axios from 'axios';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Dashboard({ children }) {
  const navigate = useNavigate();
  const logout = () => {
    axios.post('/v2/logout');
    document.cookie = 'reactFinalToken=;';
    navigate('/login');
  };
  return (
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
                <button type="button" className="btn btn-sm btn-light" onClick={logout}>
                  登出
                </button>
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
  );
}

export default Dashboard;
