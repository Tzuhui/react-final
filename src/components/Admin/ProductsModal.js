import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { MessageContext, handleErrorMessage, handleSuccessMessage } from '../../store';

function ProductsModal({
  type, data, refresh, close,
}) {
  const [, dispatch] = useContext(MessageContext);
  const [state, setState] = React.useState({
    title: '',
    category: '',
    origin_price: 0,
    price: 0,
    unit: '',
    description: '',
    content: '',
    is_enabled: 0,
    imageUrl: '',
    imagesUrl: [
    ],
  });
  useEffect(() => {
    if (type === 'edit') {
      setState((preState) => ({ ...preState, ...data }));
    }
    const myModalEl = document.getElementById('productModal');
    myModalEl.addEventListener('hidden.bs.modal', () => {
      setState((preState) => ({
        ...preState,
        title: '',
        category: '',
        origin_price: 0,
        price: 0,
        unit: '',
        description: '',
        content: '',
        is_enabled: 0,
        imageUrl: '',
        imagesUrl: [
        ],
      }));
    });
  }, [type, data.id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'is_enabled') {
      setState((preState) => ({ ...preState, is_enabled: +e.target.checked }));
    } else if (['price', 'origin_price'].includes(name)) {
      setState((preState) => ({ ...preState, [name]: +value }));
    } else {
      setState((preState) => ({ ...preState, [name]: value }));
    }
  };
  const submit = async () => {
    try {
      let res;
      if (type === 'create') {
        res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`, { data: state });
      } else {
        res = await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${data.id}`, { data: state });
      }
      handleSuccessMessage(res, dispatch);
      refresh();
    } catch (e) {
      handleErrorMessage(e, dispatch);
    }
  };
  return (
    <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {type === 'create' ? '???????????????' : '??????'}
            </h1>
            <button type="button" className="btn-close" onClick={close} aria-label="Close" />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="image">
                    ??????????????????
                    <input type="text" value={state.imageUrl} onChange={handleChange} name="imageUrl" id="image" placeholder="?????????????????????" className="form-control" />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="customFile">
                    ??? ????????????
                    <input type="file" id="customFile" className="form-control" />
                  </label>
                </div>
                <img src={state.imageUrl} alt="" className="img-fluid" />
              </div>
              <div className="col-sm-8">
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="title">
                    ??????
                    <input type="text" id="title" value={state.title} onChange={handleChange} name="title" placeholder="???????????????" className="form-control" />
                  </label>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="category">
                      ??????
                      <input type="text" id="category" value={state.category} onChange={handleChange} name="category" placeholder="???????????????" className="form-control" />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="unit">
                      ??????
                      <input type="unit" id="unit" value={state.unit} onChange={handleChange} name="unit" placeholder="???????????????" className="form-control" />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="origin_price">
                      ??????
                      <input type="number" id="origin_price" value={state.origin_price} onChange={handleChange} name="origin_price" placeholder="???????????????" className="form-control" />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="price">
                      ??????
                      <input type="number" id="price" value={state.price} onChange={handleChange} name="price" placeholder="???????????????" className="form-control" />
                    </label>
                  </div>
                </div>
                <hr />
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="description">
                    ????????????
                    <textarea type="text" id="description" value={state.description} onChange={handleChange} name="description" placeholder="?????????????????????" className="form-control" />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="content">
                    ????????????
                    <textarea type="text" id="content" value={state.content} onChange={handleChange} name="content" placeholder="???????????????????????????" className="form-control" />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <div className="form-check">
                    <label className="w-100 form-check-label" htmlFor="is_enabled">
                      ????????????
                      <input type="checkbox" id="is_enabled" checked={!!state.is_enabled} onChange={handleChange} name="is_enabled" placeholder="???????????????????????????" className="form-check-input" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={close}>??????</button>
            <button type="button" className="btn btn-primary" onClick={submit}>??????</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductsModal;
