import axios from 'axios';
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import { Modal } from 'bootstrap';
import ProductsModal from '../../components/Admin/ProductsModal';
import DeleteModal from '../../components/DeleteModal';
import Loading from '../../components/Loading';
import { MessageContext, handleErrorMessage, handleSuccessMessage } from '../../store';

function Products() {
  const [, dispatch] = useContext(MessageContext);
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
  const column = [{
    name: '分類',
    key: 'category',
  },
  {
    name: '名稱',
    key: 'title',
  }, {
    name: '售價',
    key: 'price',
  }];

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
  const openDelete = (id, name) => {
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
      handleSuccessMessage(res, dispatch);
    } catch (e) {
      handleErrorMessage(e, dispatch);
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
              {
                column.map((c) => <th scope="col">{c.name}</th>)
              }
              <th scope="col">啟用狀態</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 && data.map((d) => (
                <tr>
                  {
                    column.map((c) => <td>{d[c.key]}</td>)
                  }
                  <td>{d.is_enabled ? '啟用' : '未啟用'}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        openModal('edit', d);
                      }}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => { openDelete(d.id, d.title); }}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className={`page-link ${!page.has_pre && 'disabled'}`} href="/" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {
              [...new Array(page.total_pages)].map((_, i) => (
                <li className="page-item">
                  <a
                    className={`page-link ${(i + 1 === page.current_page) && 'active'}`}
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      changePage(i + 1);
                    }}
                  >
                    {i + 1}

                  </a>

                </li>
              ))
            }
            <li className="page-item">
              <a className={`page-link ${!page.has_next && 'disabled'}`} href="/" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
export default Products;
