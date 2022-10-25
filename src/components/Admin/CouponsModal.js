import axios from 'axios';
import React, { useEffect } from 'react';

function CouponsModal({ type, data, refresh }) {
  const [state, setState] = React.useState({
    title: '超級特惠價格',
    is_enabled: 1,
    percent: 80,
    due_date: 1555459200,
    code: 'testCode',
  });
  useEffect(() => {
    if (type === 'edit') {
      setState((preState) => ({ ...preState, ...data }));
    } else {
      setState((preState) => ({
        ...preState,
        title: '',
        is_enabled: 0,
        percent: '',
        due_date: '',
        code: '',
      }));
    }
  }, [type, data.id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['is_enabled', 'percent'].includes(name)) {
      setState((preState) => ({ ...preState, [name]: +value }));
    } else if (name === 'due_date') {
      setState((preState) => ({ ...preState, due_date: (new Date(value).getTime()) }));
    } else {
      setState((preState) => ({ ...preState, [name]: value }));
    }
  };
  const submit = async () => {
    let res;
    if (type === 'create') {
      res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`, { data: state });
    } else {
      res = await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${data.id}`, { data: state });
    }
    if (res.data.success) {
      refresh();
    }
  };
  return (
    <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {type === 'create' ? '建立新優惠券' : '編輯'}
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <div className="form-group mb-2">
              <label className="w-100" htmlFor="title">
                標題
                <input
                  type="text"
                  id="title"
                  placeholder="請輸入標題"
                  value={state.title}
                  onChange={handleChange}
                  name="title"
                  className="form-control"
                />

              </label>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label className="w-100" htmlFor="is_enabled">
                  數量
                  <input
                    type="number"
                    id="is_enabled"
                    value={state.is_enabled}
                    onChange={handleChange}
                    name="is_enabled"
                    placeholder="請輸入數量"
                    className="form-control"
                  />
                </label>
              </div>
              <div className="form-group col-md-6">
                <label className="w-100" htmlFor="percent">
                  折扣（%）
                  <input
                    type="text"
                    value={state.percent}
                    onChange={handleChange}
                    name="percent"
                    id="percent"
                    placeholder="請輸入折扣（%）"
                    className="form-control"
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label className="w-100" htmlFor="due_date">
                  到期日
                  <input
                    type="date"
                    id="due_date"
                    value={new Date(state.due_date).toLocaleString('sv-SE').split(' ')[0]}
                    onChange={handleChange}
                    name="due_date"
                    placeholder="請輸入到期日"
                    className="form-control"
                  />
                </label>
              </div>
              <div className="form-group col-md-6">
                <label className="w-100" htmlFor="code">
                  優惠碼
                  <input
                    type="text"
                    id="code"
                    value={state.code}
                    onChange={handleChange}
                    name="code"
                    placeholder="請輸入優惠碼"
                    className="form-control"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
            <button type="button" className="btn btn-primary" onClick={submit}>儲存</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CouponsModal;
