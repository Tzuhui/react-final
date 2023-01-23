import React, { useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';

function Home() {
  const [data, setData] = React.useState([]);
  const getData = async (p = 1) => {
    const category = ['甜點', '熱食'];
    const random = category[Math.floor(Math.random() * category.length)];
    const res = await axios(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${p}&category=${random}`);
    setData(res.data.products.slice(0, 3));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row flex-md-row-reverse flex-column">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1597075561373-cf8898ec7290?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3">
            <h2 className="fw-bold">為您帶來更多美食佳餚。</h2>
            <h5 className="font-weight-normal text-muted mt-2">
              我們有專業的外送夥伴，早餐、午餐、晚餐、宵夜及下午茶，通通都可以在 HEX EATS 點。
            </h5>
            <div className="flex mt-3">
              <NavLink
                to="/products"
                className="btn btn-dark rounded-0 px-4"
              >
                找美食
              </NavLink>
            </div>
          </div>
        </div>
        <h2 className="fw-bold mt-5">熱門美食</h2>
        <div className="row mt-3">
          {data.map((p) => (
            <div className="col-md-4 mt-md-4" key={`hot_food_${p.id}`}>
              <div className="card border-0 mb-4 position-relative position-relative">
                <img
                  src={p.imageUrl}
                  className="card-img-top rounded-0"
                  style={{ height: '300px', objectFit: 'cover' }}
                  alt={p.title}
                />
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-4">{p.title}</h4>
                  <div className="d-flex justify-content-between  align-items-start mt-3">
                    <p className="card-text text-muted mb-0 w-75">
                      {p.description}
                    </p>
                    <NavLink
                      to={`/product/${p.id}`}
                      className="btn btn-outline-dark rounded-0 text-nowrap"
                    >
                      詳細介紹
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-light mt-7">
        <div className="container">
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row justify-content-center py-7">
                  <div className="col-md-8 d-flex">
                    <img src="https://images.unsplash.com/photo-1490138139357-fc819d02e344?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80" alt="" className="rounded-circle me-5" style={{ width: '160px', height: '160px', objectFit: 'cover' }} />
                    <div className="d-flex flex-column">
                      <p className="h5">“Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.”</p>
                      <p className="mt-auto text-muted">Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row justify-content-center py-7">
                  <div className="col-md-8 d-flex">
                    <img src="https://images.unsplash.com/photo-1490138139357-fc819d02e344?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80" alt="" className="rounded-circle me-5" style={{ width: '160px', height: '160px', objectFit: 'cover' }} />
                    <div className="d-flex flex-column">
                      <p className="h5">“Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.”</p>
                      <p className="mt-auto text-muted">Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row justify-content-center py-7">
                  <div className="col-md-8 d-flex">
                    <img src="https://images.unsplash.com/photo-1490138139357-fc819d02e344?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80" alt="" className="rounded-circle me-5" style={{ width: '160px', height: '160px', objectFit: 'cover' }} />
                    <div className="d-flex flex-column">
                      <p className="h5">“Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.”</p>
                      <p className="mt-auto text-muted">Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className="container my-7">
        <div className="row">
          <div className="col-md-4">
            <img src="https://images.unsplash.com/photo-1548689816-c399f954f3dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt="" style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
            <h4 className="mt-4">Lorem ipsum</h4>
            <p className="text-muted">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</p>
          </div>
          <div className="col-md-4">
            <img src="https://images.unsplash.com/photo-1548689816-c399f954f3dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt="" style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
            <h4 className="mt-4">Lorem ipsum</h4>
            <p className="text-muted">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</p>
          </div>
          <div className="col-md-4">
            <img src="https://images.unsplash.com/photo-1548689816-c399f954f3dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt="" style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
            <h4 className="mt-4">Lorem ipsum</h4>
            <p className="text-muted">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</p>
          </div>
        </div>
      </div>
      <div className="bg-light py-7">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 text-center">
              <h3>Lorem ipsum</h3>
              <p className="text-muted">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.</p>
              <button type="button" className="btn btn-dark mt-4 rounded-0">Lorem ipsum</button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dark">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between text-white py-4">
            <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
