import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
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
            {/* <a href="#"><i className="fas fa-heart me-5" /></a>
        <a href="./cart-2.html"><i className="fas fa-shopping-cart" /></a> */}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
