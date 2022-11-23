import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { MessageContext, handleErrorMessage, handleSuccessMessage } from '../../store';

function OrderModal({
  type, close, data, refresh,
}) {
  const [, dispatch] = useContext(MessageContext);
  const [state, setState] = React.useState({
    is_paid: '',
  });
  useEffect(() => {
    if (data?.is_paid) {
      setState((preState) => ({
        ...preState,
        is_paid: data.is_paid,
      }));
    }
  }, [data]);
  const changePaidStatus = () => {
    setState((preState) => ({
      ...preState,
      is_paid: !preState.is_paid,
    }));
  };
  const submit = async () => {
    try {
      const res = await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${data.id}`, {
        data: {
          ...data,
          is_paid: state.is_paid,
        },
      });
      close();
      refresh();
      handleSuccessMessage(res, dispatch);
    } catch (e) {
      handleErrorMessage(e, dispatch);
    }
  };
  return (
    <div className="modal fade" id="orderModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {type === 'product' && '訂單商品'}
              {type === 'edit' && '編輯訂單'}
            </h1>
            <button type="button" className="btn-close" onClick={close} aria-label="Close" />
          </div>
          <div className="modal-body">
            {type === 'product' && data && Object.values(data).length > 0 && (
            <ul className="list-group">
              {Object.values(data).map((ele) => (
                <li className="list-group-item border-0 border-bottom">
                  {ele.product.title}
                  {' '}
                  *
                  {' '}
                  {ele.qty}
                </li>
              ))}
            </ul>
            )}
            {type === 'edit' && (
            <div>
              <h4>
                訂單編號：
                {data.id}
              </h4>
              <h5 className="mt-4">
                修改訂單狀態
              </h5>
              <div className="form-check mb-4">
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  <input className="form-check-input" type="checkbox" id="flexCheckChecked" checked={state.is_paid} onChange={changePaidStatus} />
                  付款狀態
                </label>
              </div>
              <button type="button" className="btn btn-outline-primary" onClick={submit}>修改</button>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderModal;
