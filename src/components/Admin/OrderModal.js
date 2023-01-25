import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { MessageContext, handleErrorMessage, handleSuccessMessage } from '../../store';

function OrderModal({
  close, data, refresh, id,
}) {
  const [, dispatch] = useContext(MessageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    ...data,
    is_paid: '',
    status: 0,
  });
  useEffect(() => {
    if (data?.is_paid) {
      setState((preState) => ({
        ...preState,
        is_paid: data.is_paid,
        status: data.status,
      }));
    }
  }, [data]);

  const submit = async () => {
    setIsLoading(true);
    try {
      const res = await axios
        .put(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${data.id}`, {
          data: {
            ...data,
            ...state,
          },
        });
      // close();
      refresh();
      setIsLoading(false);
      handleSuccessMessage(res, dispatch);
    } catch (e) {
      setIsLoading(false);
      handleErrorMessage(e, dispatch);
    }
  };

  const changeStatus = (e) => {
    const { name, value, checked } = e.target;
    if (['is_paid'].includes(name)) {
      setState((preState) => ({ ...preState, [name]: checked }));
    } else {
      setState((preState) => ({ ...preState, [name]: value }));
    }
    submit();
  };
  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              訂單編號：
              {data.id}
            </h1>
            <button type="button" className="btn-close" onClick={close} aria-label="Close" />
          </div>
          <div className="modal-body">
            <div className="mb-3 row">
              <span className="col-sm-2 col-form-label">Email</span>
              <div className="col-sm-10">
                <input type="email" readOnly className="form-control-plaintext" id="staticEmail" defaultValue={data?.user?.email} />
              </div>
            </div>
            <div className="mb-3 row">
              <span className="col-sm-2 col-form-label">訂購者</span>
              <div className="col-sm-10">
                <input type="text" readOnly className="form-control-plaintext" id="staticEmail" defaultValue={data?.user?.name} />
              </div>
            </div>
            <div className="mb-3 row">
              <span className="col-sm-2 col-form-label">外送地址</span>
              <div className="col-sm-10">
                <input type="text" readOnly className="form-control-plaintext" defaultValue={data?.user?.address} />
              </div>
            </div>
            <div className="mb-3 row">
              <span className="col-sm-2 col-form-label">留言</span>
              <div className="col-sm-10">
                <textarea name="" id="" cols="30" readOnly className="form-control-plaintext" defaultValue={data.message} />
              </div>
            </div>
            { data.products && (
            <table className="table">
              <thead>
                <tr>
                  <th>品項名稱</th>
                  <th>數量</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(data.products).map((cart) => (
                  <tr key={cart.id}>
                    <td>{cart.product.title}</td>
                    <td>{cart.qty}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="border-0 text-end">總金額</td>
                  <td className="border-0">
                    $
                    {data.total}
                  </td>
                </tr>
              </tfoot>
            </table>
            )}

            <div>
              <h5 className="mt-4">
                修改訂單狀態
              </h5>
              <div className="form-check mb-4">
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  <input className="form-check-input" type="checkbox" name="is_paid" value={state.is_paid} onChange={changeStatus} disabled={isLoading} />
                  付款狀態
                </label>
              </div>
              <div className="mb-4">
                <span className="col-sm-2 col-form-label d-block">外送進度</span>
                <select className="form-select" name="status" value={state.status} onChange={changeStatus} disabled={isLoading}>
                  <option value={0}>未確認</option>
                  <option value={1}>已確認</option>
                  <option value={2}>外送中</option>
                  <option value={3}>已送達</option>
                </select>
              </div>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={submit}
              >
                修改

              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderModal;
