import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

function Success() {
  const { orderId } = useParams();
  const [state, setState] = React.useState({
    order: {},
    products: [],
  });
  const getOrder = async () => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`);
    if (res.data.success) {
      setState((prev) => ({
        ...prev,
        order: res.data.order,
        products: Object.values(res.data.order.products),
      }));
    }
  };
  useEffect(() => {
    if (orderId) {
      getOrder(orderId);
    }
  }, [orderId]);
  return (
    <div className="container">
      <div style={{
        minHeight: '400px',
        backgroundImage: 'url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80)',
        backgroundPosition: 'center center',
      }}
      />
      <div className="mt-5 mb-7">
        <div className="row">
          <div className="col-md-6">
            <h2>結帳成功</h2>
            <h4 className="mb-0">
              Hello,
              {' '}
              {state.order?.user?.name}
            </h4>
            <p>感謝您的訂購，您的餐點將在 30 分鐘內送達您填寫的地址。</p>
            <p>
              送達地址：
              {state.order?.user?.address}
            </p>
            <NavLink
              to="/"
              className="btn btn-outline-dark me-2 rounded-0 mb-4 px-4"
            >
              回到首頁
            </NavLink>
          </div>
          <div className="col-md-6">
            <div className="card rounded-0 py-4">
              <div className="card-header border-bottom-0 bg-white px-4 py-0">
                <h2>訂單明細</h2>
              </div>
              <div className="card-body px-4 py-0">
                <ul className="list-group list-group-flush">
                  {
                    state.products.map((p) => (
                      <li className="list-group-item px-0" key={p.id}>
                        <div className="d-flex mt-2">
                          <img src={p.product.imageUrl} alt="" className="me-2" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                          <div className="w-100 d-flex flex-column">
                            <div className="d-flex justify-content-between fw-bold">
                              <h6 className="mb-0">{p.product.title}</h6>
                              <p className="mb-0">
                                x
                                {p.qty}
                              </p>
                            </div>
                            <div className="d-flex justify-content-between mt-auto">
                              <p className="text-muted mb-0">
                                <small>
                                  NT$
                                  {' '}
                                  {p.product.price}
                                </small>
                              </p>
                              <p className="mb-0">
                                NT$
                                {p.product.price * p.qty}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  }
                  <li className="list-group-item px-0 pb-0">
                    <table className="table text-muted">
                      <tbody>
                        <tr>
                          <th scope="row" className="border-0 px-0 font-weight-normal">備註</th>
                          <td className="text-end border-0 px-0">
                            {' '}
                            {state.order?.message}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="border-0 px-0 pt-0 font-weight-normal">付款方式</th>
                          <td className="text-end border-0 px-0 pt-0">{state.order?.user?.payment}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between mt-2">
                      <p className="mb-0 h4 fw-bold">總額</p>
                      <p className="mb-0 h4 fw-bold">
                        NT$
                        {parseInt(state.order.total, 10)}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Success;
