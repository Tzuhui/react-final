import React from 'react';

function Header() {
  return (
    <div className="bg-white sticky-top">
      <div className="container">
        <nav className="navbar px-0 navbar-expand-lg navbar-light bg-white">
          <a
            className="navbar-brand position-absolute"
            href="/"
            style={{ left: '50%', transform: 'translate(-50%, -50%)', top: '50%' }}
          >
            HEX EATS
          </a>
          <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse bg-white custom-header-md-open" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link ps-0" href="./product.html">找美食</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./detail.html">Lorem ipsum</a>
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
