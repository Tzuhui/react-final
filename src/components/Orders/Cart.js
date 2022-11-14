import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Cart({
  carts, total, finalTotal, changePage,
}) {
  const [state, setState] = useState({
    price: 0,
    code: '',
    result: false,
  });
  const postCoupon = () => {
    axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/coupon`, { data: { code: state.code } }).then((res) => {
      if (res.data.success) {
        setState((prv) => ({
          ...prv, result: res.data.success, price: res.data.data.final_total, code: '',
        }));
      }
    });
  };
  useEffect(() => {
    if (total !== finalTotal) {
      setState((prv) => ({ ...prv, result: true, price: finalTotal }));
    }
  }, [total, finalTotal]);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-white py-5">
          <div className="d-flex justify-content-between">
            <h2 className="mt-2">您的餐點</h2>
          </div>
          {
            carts.map((c) => (
              <div className="d-flex mt-4 bg-light" key={`cart_${c.product.id}`}>
                <img
                  src={c.product.imageUrl}
                  alt=""
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <div className="w-100 p-3 position-relative">
                  <p className="mb-0 fw-bold">{c.product.title}</p>
                  <p className="mb-1 text-muted small">
                    {c.product.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="cart-count">
                      {c.qty}
                    </div>
                    <p className="mb-0 ms-auto">
                      NT$
                      {' '}
                      {parseInt(c.final_total, 10)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          }
          <div className="input-group mt-4">
            <input type="text" value={state.code} onChange={(e) => { setState((prv) => ({ ...prv, code: e.target.value })); }} className="form-control rounded-0" placeholder="新增優惠券" aria-label="新增優惠券" aria-describedby="新增優惠券" />
            <button className="btn btn-secondary rounded-0" type="button" id="button-addon2" onClick={postCoupon}>套用優惠</button>
          </div>
          <div className="d-flex justify-content-between align-items-end mt-4">
            <p className="mb-0 h4 fw-bold">總額</p>
            <div>
              <div className="d-flex">
                {/* <p className="mb-0 text-muted text-end ">
                  <del>
                    NT$
                    {' '}
                    {total}
                  </del>
                </p> */}
                {state.result && (
                <p className="mb-0 ms-2 text-success fw-bold">
                  已套用優惠
                  {' '}
                  {`(-${parseInt(100 - (state.price / total) * 100, 10)}%)`}
                </p>
                )}

              </div>
              <p className="mb-0 h4 fw-bold text-end">
                NT$
                {
                  total === finalTotal && !state.result
                    ? parseInt(total, 10) : parseInt(state.price, 10)
                }
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-dark btn-block mt-4 rounded-0 py-3"
            onClick={() => { changePage(2); }}
          >
            確認餐點正確
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
