import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Navbar({ state, getCart }) {
  const [loading, setLoading] = useState('');
  const removeCart = async ({ id }) => {
    setLoading(id);
    await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`);
    getCart();
    setLoading('');
  };
  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className="bg-white sticky-top">
      <div className="container">
        <nav className="navbar px-0 navbar-expand-lg navbar-light bg-white">
          <NavLink
            to="/"
            className="navbar-brand position-absolute"
            style={{ left: '50%', transform: 'translate(-50%, -50%)', top: '50%' }}
          >
            HEX EATS
          </NavLink>
          <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse bg-white custom-header-md-open" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <NavLink
                  to="/products"
                  className="nav-link ps-0"
                >
                  找美食
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="d-flex">
            {/* <a href="#"><i className="fas fa-heart me-5" /></a> */}
            <div className="dropdown">
              <a href="/" className="link-dark position-relative" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                <i className="bi bi-bag-fill fs-3" />
                <span className="cart-notify">{state.cartLength}</span>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton1"
                style={{ minWidth: '400px', maxHeight: '250px', overflow: 'auto' }}
              >
                <div className="d-flex justify-content-between align-items-center px-3">
                  <h6 className="h6 mb-0">
                    購物車清單
                  </h6>
                  <NavLink
                    to="/orders/cart"
                    className="btn btn-sm btn-primary"
                  >
                    我要結帳
                  </NavLink>
                </div>
                <hr className="mt-2 mb-0" />
                <p className="text-center m-0 small">小提醒：前往結帳頁面可以再套用優惠卷哦！</p>
                <hr className="my-0" />
                <table className="table">
                  <tbody>
                    {
                      state.carts.map((c) => (
                        <tr key={c.product.id}>
                          <td className="align-middle">
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              disabled={loading === c.id}
                              onClick={() => removeCart(c)}
                            >
                              <i className="bi bi-x-lg" />
                            </button>
                          </td>
                          <td className="align-middle">
                            {c.product.title}
                          </td>
                          <td className="align-middle">{c.qty}</td>
                          <td className="align-middle text-right">
                            NT$
                            {' '}
                            {parseInt(c.final_total, 10)}
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
