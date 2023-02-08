/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { handleErrorMessage, handleSuccessMessage } from '../../slice/messageSlice';

function Cart() {
  const {
    getCart, total, finalTotal, carts,
  } = useOutletContext();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    price: 0,
    code: '',
    loadingItem: '',
    result: false,
  });

  const postCoupon = async (code) => {
    try {
      const res = await axios
        .post(`/v2/api/${process.env.REACT_APP_API_PATH}/coupon`, {
          data: { code },
        });
      dispatch(handleSuccessMessage(res.data));
      if (res.data.success) {
        getCart();
      }
    } catch (e) {
      setState({ ...state, code: '' });
      dispatch(handleErrorMessage(e));
    }
  };

  const updateQuantity = async (data, id) => {
    setState({ ...state, loadingItem: id });
    const res = await axios
      .put(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`, { data });
    setState({ ...state, loadingItem: '' });

    if (res.data.success) {
      getCart();
    }
  };
  const removeCartItem = async (id) => {
    setState({ ...state, loadingItem: id });
    const res = await axios
      .delete(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`);
    setState({ ...state, loadingItem: '' });

    if (res.data.success) {
      getCart();
    }
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
            carts.map((cart) => (
              <div className="d-flex mt-4 bg-light" key={`cart_${cart.product.id}`}>
                <img
                  src={cart.product.imageUrl}
                  alt=""
                  style={{ width: '100px', objectFit: 'cover' }}
                />
                <div className="w-100 p-3 position-relative">
                  <p className="mb-0 fw-bold">
                    {cart.product.title}
                    <button
                      type="button"
                      className="btn-close float-end"
                      disabled={state.loadingItem === cart.id}
                      onClick={(e) => {
                        e.preventDefault();
                        removeCartItem(cart.id);
                      }}
                    />
                  </p>
                  <p className="mb-1 text-muted small">
                    {cart.product.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <select
                      name=""
                      id=""
                      className="form-select w-25"
                      value={cart.qty}
                      disabled={state.loadingItem === cart.id}
                      onChange={(e) => {
                        e.preventDefault();
                        const qty = parseInt(e.target.value, 10);
                        updateQuantity({
                          qty,
                          product_id: cart.product_id,
                        }, cart.id);
                      }}
                    >
                      {[...Array(20)].map((_, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option value={i + 1} key={i}>{i + 1}</option>
                      ))}
                    </select>
                    <p className="mb-0 ms-auto">
                      NT$
                      {' '}
                      {parseInt(cart.final_total, 10)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          }
          <div className="input-group mt-4">
            <input type="text" value={state.code} onChange={(e) => { setState((prv) => ({ ...prv, code: e.target.value })); }} className="form-control rounded-0" placeholder="新增優惠券" aria-label="新增優惠券" aria-describedby="新增優惠券" />
            <button className="btn btn-secondary rounded-0" type="button" id="button-addon2" onClick={() => { postCoupon(state.code); }}>套用優惠</button>
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
          <Link
            type="button"
            className="btn btn-dark btn-block mt-4 rounded-0 py-3"
            to="/orders/checkout"
          >
            確認餐點正確
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
