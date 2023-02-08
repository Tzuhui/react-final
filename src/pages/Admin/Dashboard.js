import axios from 'axios';
import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';

function getCookie(name) {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
  return cookieValue;
}

function Dashboard() {
  const token = getCookie('reactFinalToken');
  axios.defaults.headers.Authorization = token;

  const navigate = useNavigate();
  const logout = () => {
    axios.post('/v2/logout');
    document.cookie = 'reactFinalToken=;';
    navigate('/login');
  };

  if (!token) {
    navigate('/login');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <p className="text-white mb-0">
            HEX EATS 後台管理系統
          </p>
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
          <ul className="list-group list-group-flush">
            <NavLink className="list-group-item list-group-item-action py-3" to="/admin/products">
              <i className="bi bi-cup-fill me-2" />
              產品列表
            </NavLink>
            <NavLink className="list-group-item list-group-item-action py-3" to="/admin/coupons">
              <i className="bi bi-ticket-perforated-fill me-2" />
              優惠卷列表
            </NavLink>
            <NavLink className="list-group-item list-group-item-action py-3" to="/admin/orders">
              <i className="bi bi-receipt me-2" />
              訂單列表
            </NavLink>
          </ul>
        </div>
        <div className="w-100"><Outlet /></div>
      </div>
    </>
  );
}

export default Dashboard;
