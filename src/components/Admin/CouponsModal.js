import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { MessageContext, handleErrorMessage, handleSuccessMessage } from '../../store';

function CouponsModal({
  type, coupon, refresh, close, id,
}) {
  const [, dispatch] = useContext(MessageContext);
  const [date, setDate] = useState(new Date());
  const [state, setState] = useState({
    title: '超級特惠價格',
    is_enabled: 1,
    percent: 80,
    code: 'testCode',
  });
  useEffect(() => {
    if (type === 'edit') {
      setState((preState) => ({ ...preState, ...coupon }));
      setDate(new Date(coupon.due_date));
    } else {
      setState((preState) => ({
        ...preState,
        title: '',
        is_enabled: 0,
        percent: '',
        due_date: '',
        code: '',
      }));
      setDate(new Date());
    }
  }, [type, coupon.id]);
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (['is_enabled', 'percent'].includes(name)) {
      setState((preState) => ({ ...preState, [name]: +checked }));
    } else {
      setState((preState) => ({ ...preState, [name]: value }));
    }
  };
  const submit = async () => {
    try {
      let res;
      const data = {
        ...state,
        due_date: new Date(date).getTime(),
      };
      if (type === 'create') {
        res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`, { data });
      } else {
        res = await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${coupon.id}`, { data });
      }
      close();
      refresh();
      handleSuccessMessage(res, dispatch);
    } catch (e) {
      handleErrorMessage(e, dispatch);
    }
  };
  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {type === 'create' ? '建立新優惠券' : '編輯'}
            </h1>
            <button type="button" className="btn-close" onClick={close} aria-label="Close" />
          </div>
          <div className="modal-body">
            <div className="mb-2">
              <label className="w-100" htmlFor="title">
                標題
                <input
                  type="text"
                  id="title"
                  placeholder="請輸入標題"
                  value={state.title}
                  onChange={handleChange}
                  name="title"
                  className="form-control mt-1"
                />

              </label>
            </div>
            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="percent">
                  折扣（%）
                  <input
                    type="text"
                    value={state.percent}
                    onChange={handleChange}
                    name="percent"
                    id="percent"
                    placeholder="請輸入折扣（%）"
                    className="form-control mt-1"
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="due_date">
                  到期日
                  <input
                    type="date"
                    id="due_date"
                    value={
                      `${date.getFullYear().toString()
                      }-${
                        (date.getMonth() + 1).toString().padStart(2, 0)
                      }-${
                        date.getDate().toString().padStart(2, 0)}`
                    }
                    onChange={(e) => {
                      setDate(new Date(e.target.value));
                    }}
                    name="due_date"
                    placeholder="請輸入到期日"
                    className="form-control mt-1"
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="code">
                  優惠碼
                  <input
                    type="text"
                    id="code"
                    value={state.code}
                    onChange={handleChange}
                    name="code"
                    placeholder="請輸入優惠碼"
                    className="form-control mt-1"
                  />
                </label>
              </div>
            </div>
            <label className="form-check-label" htmlFor="is_enabled">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="is_enabled"
                name="is_enabled"
                value={!!state.is_enabled}
                onChange={handleChange}
              />
              Check me out
            </label>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={close}>關閉</button>
            <button type="button" className="btn btn-primary" onClick={submit}>儲存</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CouponsModal;
