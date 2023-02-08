import axios from 'axios';
import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import { Modal } from 'bootstrap';
import { useDispatch } from 'react-redux';
import ProductsModal from '../../components/Admin/ProductsModal';
import DeleteModal from '../../components/DeleteModal';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import { handleErrorMessage, handleSuccessMessage } from '../../slice/messageSlice';

function Products() {
  const dispatch = useDispatch();
  const [pageState, setPageState] = useState({
    type: 'create',
    data: {},
    loading: true,
  });
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    category: '',
    current_page: 1,
    has_next: false,
    has_pre: false,
    total_pages: 1,
  });
  const getData = async (p = 1) => {
    setPageState((prev) => ({ ...prev, loading: true }));
    try {
      const res = await axios(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${p}`);
      setData(res.data.products);
      setPage(res.data.pagination);
    } catch (e) {
      handleErrorMessage(e, dispatch);
    }
    setPageState((prev) => ({ ...prev, loading: false }));
  };
  const changePage = (pageNum) => {
    getData(pageNum);
  };

  // Modal 相關事件
  const productModal = useRef('');
  const deleteModal = useRef('');
  useEffect(() => {
    getData();
    productModal.current = new Modal('#productModal');
    deleteModal.current = new Modal('#deleteModal');
  }, []);
  const openModal = (type, item) => {
    productModal.current.show();
    setPageState({ type, data: item });
  };
  const closeModal = () => {
    productModal.current.hide();
    setPageState({ type: '', data: {} });
  };
  // const column = [{
  //   name: '分類',
  //   key: 'category',
  // },
  // {
  //   name: '名稱',
  //   key: 'title',
  // }, {
  //   name: '售價',
  //   key: 'price',
  // }];

  // 刪除
  const [deleteData, setDeleteData] = useState({
    open: false,
    deleteId: null,
    deleteName: null,
  });
  const handleClose = () => {
    setDeleteData((preDelete) => ({
      ...preDelete,
      open: false,
      deleteId: null,
      deleteName: null,
    }));
  };
  const openDeleteModal = (id, name) => {
    deleteModal.current.show();
    setDeleteData((preDelete) => ({
      ...preDelete,
      open: true,
      deleteId: id,
      deleteName: name,
    }));
  };
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${deleteData.deleteId}`, { data: pageState });
      if (res.data.success) {
        getData();
      }
      dispatch(handleSuccessMessage(res.data));
    } catch (e) {
      dispatch(handleErrorMessage(e));
    }
    deleteModal.current.hide();
  };
  return (
    <>
      {
        pageState.loading && <Loading />
      }
      <DeleteModal
        text={`確認要刪除 ${deleteData.deleteName} 嗎？`}
        close={handleClose}
        open={deleteData.open}
        check={handleDelete}
        id="deleteModal"
      />
      <ProductsModal
        type={pageState.type}
        data={pageState.data}
        refresh={() => {
          getData();
          closeModal();
        }}
        close={closeModal}
        id="productModal"
      />
      <div className="p-3">
        <h3>產品列表</h3>
        <hr />
        <div className="text-end">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => { openModal('create', {}); }}
          >
            建立新商品
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">分類</th>
              <th scope="col">名稱</th>
              <th scope="col">售價</th>
              <th scope="col">啟用狀態</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 && data.map((product) => (
                <tr key={product.id}>
                  <td>{product.category}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        openModal('edit', product);
                      }}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => { openDeleteModal(product.id, product.title); }}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Pagination page={page} changePage={changePage} />
      </div>
    </>
  );
}
export default Products;
