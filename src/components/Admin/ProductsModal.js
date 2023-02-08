import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleErrorMessage, handleSuccessMessage } from '../../slice/messageSlice';

function ProductsModal({
  type, data, refresh, close, id,
}) {
  const dispatch = useDispatch();
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
      refresh();
      dispatch(handleSuccessMessage(res.data));
    } catch (e) {
      dispatch(handleErrorMessage(e));
    }
  };

  const uploadFile = async (e) => {
    // console.log(e.target.files[0]);
    const uploadedFile = e.target.files[0];
    const formData = new FormData();
    formData.append('file-to-upload', uploadedFile);
    try {
      const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/upload`, formData);
      const { imageUrl } = res.data;
      setState((preState) => ({ ...preState, imageUrl }));
    } catch (error) {
      handleErrorMessage(error, dispatch);
    }
  };

  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {type === 'create' ? '建立新商品' : '編輯'}
            </h1>
            <button type="button" className="btn-close" onClick={close} aria-label="Close" />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="image">
                    輸入圖片網址
                    <input type="text" value={state.imageUrl} onChange={handleChange} name="imageUrl" id="image" placeholder="請輸入圖片連結" className="form-control" />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="customFile">
                    或 上傳圖片
                    <input
                      type="file"
                      id="customFile"
                      className="form-control"
                      onChange={uploadFile}
                    />
                  </label>
                </div>
                <img src={state.imageUrl} alt="" className="img-fluid" />
              </div>
              <div className="col-sm-8">
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="title">
                    標題
                    <input type="text" id="title" value={state.title} onChange={handleChange} name="title" placeholder="請輸入標題" className="form-control" />
                  </label>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="category">
                      分類
                      <input type="text" id="category" value={state.category} onChange={handleChange} name="category" placeholder="請輸入分類" className="form-control" />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="unit">
                      單位
                      <input type="unit" id="unit" value={state.unit} onChange={handleChange} name="unit" placeholder="請輸入單位" className="form-control" />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="origin_price">
                      原價
                      <input type="number" id="origin_price" value={state.origin_price} onChange={handleChange} name="origin_price" placeholder="請輸入原價" className="form-control" />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="price">
                      售價
                      <input type="number" id="price" value={state.price} onChange={handleChange} name="price" placeholder="請輸入售價" className="form-control" />
                    </label>
                  </div>
                </div>
                <hr />
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="description">
                    產品描述
                    <textarea type="text" id="description" value={state.description} onChange={handleChange} name="description" placeholder="請輸入產品描述" className="form-control" />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="content">
                    說明內容
                    <textarea type="text" id="content" value={state.content} onChange={handleChange} name="content" placeholder="請輸入產品說明內容" className="form-control" />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <div className="form-check">
                    <label className="w-100 form-check-label" htmlFor="is_enabled">
                      是否啟用
                      <input type="checkbox" id="is_enabled" checked={!!state.is_enabled} onChange={handleChange} name="is_enabled" placeholder="請輸入產品說明內容" className="form-check-input" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
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
export default ProductsModal;
