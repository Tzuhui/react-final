import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OrderForm({ carts, finalTotal, changePage }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/order`, {
      data: {
        user: {
          name: data.name,
          email: data.email,
          tel: data.tel,
          address: data.address,
          payment: data.payType,
        },
        message: data.message,
      },
    });
    if (res.data.success) {
      await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/pay/${res.data.orderId}`);
      navigate(`/order/${res.data.orderId}`);
    }
  };
  const [state, setState] = React.useState({
    payType: '',
    message: '',
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit((data) => submit(data))}>
        <div className="row justify-content-center flex-md-row flex-column-reverse">
          <div className="col-md-6">
            <div className="bg-white p-4">
              <h4 className="fw-bold">1. 訂購人資訊</h4>
              <p className="mt-4">訂購人資訊</p>
              <div className="mb-2">
                <label
                  htmlFor="ContactMail"
                  className="text-muted mb-0 form-label w-100"
                >
                  Email
                  <input
                    type="email"
                    className={`form-control rounded-0 mt-1 ${errors.email && 'error'}`}
                    id="ContactMail"
                    aria-describedby="emailHelp"
                    placeholder="example@gmail.com"
                    name="email"
                    {...register('email', {
                      required: {
                        value: true,
                        message: '此欄位為必填',
                      },
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Email 格式錯誤',
                      },
                    })}
                  />
                </label>
                {errors.email && <p className="small text-danger mt-1">{errors?.email?.message}</p>}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="ContactName"
                  className="text-muted mb-0 form-label w-100"
                >
                  姓名
                  <input
                    type="text"
                    className={`form-control rounded-0 mt-1 ${errors.name && 'error'}`}
                    id="ContactName"
                    name="name"
                    placeholder="請輸入訂購人姓名"
                    {...register('name', {
                      required: {
                        value: true,
                        message: '此欄位為必填',
                      },
                    })}
                  />
                </label>
                {errors.name && <p className="small text-danger mt-1">{errors?.name?.message}</p>}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="ContactPhone"
                  className="text-muted mb-0 form-label w-100"
                >
                  電話
                  <input
                    type="text"
                    className={`form-control rounded-0 mt-1 ${errors.tel && 'error'}`}
                    id="ContactPhone"
                    placeholder="0933-123-123"
                    name="tel"
                    {...register('tel', {
                      required: {
                        value: true,
                        message: '此欄位為必填',
                      },
                    })}
                  />
                </label>
                {errors.tel && <p className="small text-danger mt-1">{errors?.tel?.message}</p>}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-muted mb-0 form-label w-100"
                >
                  備註
                  <textarea
                    id="message"
                    className="form-control rounded-0 mt-1"
                    name="message"
                    rows="2"
                    {...register('message')}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className="bg-white p-4 mt-3">
              <h4 className="fw-bold">2. 外送資訊</h4>
              <p className="mt-4 mb-3">外送地址</p>
              <input
                type="text"
                name="address"
                {...register('address', {
                  required: {
                    value: true,
                    message: '此欄位為必填',
                  },
                })}
                className={`form-control rounded-0 mt-1 ${errors.address && 'error'}`}
                id="inputCity"
                placeholder="請完整填寫地址"
              />
              {errors.address && <p className="small text-danger mt-1">{errors?.address?.message}</p>}
              <p className="mt-4 mb-2">付款方式</p>
              <div className="form-check mb-2">
                <label
                  className="form-check-label text-muted"
                  htmlFor="gridRadios1"
                >
                  <input
                    {...register('payType', {
                      required: {
                        value: true,
                        message: '此欄位為必填',
                      },
                    })}
                    onChange={handleChange}
                    className="form-check-input"
                    type="radio"
                    name="payType"
                    id="gridRadios1"
                    value="WebATM"
                  />
                  WebATM
                </label>
              </div>
              <div className="form-check mb-2">
                <label
                  className="form-check-label text-muted"
                  htmlFor="gridRadios2"
                >
                  <input
                    {...register('payType', {
                      required: {
                        value: true,
                        message: '此欄位為必填',
                      },
                    })}
                    className="form-check-input"
                    type="radio"
                    name="payType"
                    id="gridRadios2"
                    value="ATM"
                  />

                  ATM
                </label>
              </div>
              <div className="form-check mb-2">
                <label
                  className="form-check-label text-muted"
                  htmlFor="gridRadios3"
                >
                  <input
                    {...register('payType', {
                      required: {
                        value: true,
                        message: '此欄位為必填',
                      },
                    })}
                    className="form-check-input"
                    type="radio"
                    name="payType"
                    id="gridRadios3"
                    value="ApplePay"
                  />

                  ApplePay
                </label>
              </div>
              {errors.payType && <p className="small text-danger mt-1">{errors?.payType?.message}</p>}
            </div>
            <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
              <a
                href="/"
                type="button"
                className="text-dark mt-md-0 mt-3 text-decoration-none"
                onClick={(e) => { e.preventDefault(); changePage(1); }}
              >
                <i className="bi bi-chevron-left" />
                {' '}
                返回
              </a>
              <button
                type="submit"
                className="btn btn-dark py-3 px-7 rounded-0"
              >
                確認付款
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="border p-4 mb-4">
              <h4 className="mb-4">訂單細節</h4>
              {
                carts.map((c) => (
                  <div className="d-flex mb-2" key={`order_form_${c.product.id}`}>
                    <img
                      src={c.product.imageUrl}
                      alt={c.product.title}
                      className="me-2 img-fluid"
                      style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                    />
                    <div className="w-100">
                      <div className="d-flex justify-content-between fw-bold">
                        <p className="mb-0">{c.product.title}</p>
                        <p className="mb-0">
                          x
                          {c.qty}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">
                          <small>
                            NT$
                            {' '}
                            {c.product.price}
                          </small>
                        </p>
                        <p className="mb-0">
                          NT$
                          {' '}
                          {c.product.price * c.qty}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              }
              <table className="table mt-4 border-top border-bottom text-muted">
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="border-0 px-0 pt-4 font-weight-normal"
                    >
                      備註
                    </th>
                    <td className="text-end border-0 px-0 pt-4" style={{ maxWidth: '150px' }}>{state.message}</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                    >
                      付款方式
                    </th>
                    <td className="text-end border-0 px-0 pt-0 pb-4">{state.payType}</td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-between mt-4">
                <p className="mb-0 h4 fw-bold">Total</p>
                <p className="mb-0 h4 fw-bold">
                  NT$
                  {' '}
                  {parseInt(finalTotal, 10)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default OrderForm;
