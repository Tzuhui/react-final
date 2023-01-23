import axios from 'axios';
import React, { useEffect, useRef, useContext } from 'react';
import { Modal } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import OrderModal from '../../components/Admin/OrderModal';
import DeleteModal from '../../components/DeleteModal';
import Loading from '../../components/Loading';
import { MessageContext, handleErrorMessage, handleSuccessMessage } from '../../store';

function Orders() {
  const [, dispatch] = useContext(MessageContext);
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    type: 'create',
    data: {},
    loading: true,
  });
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState({
    category: '',
    current_page: 1,
    has_next: false,
    has_pre: false,
    total_pages: 1,
  });
  const getData = async (p = 1) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const res = await axios(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${p}`);
      setData(res.data.orders);
      setPage(res.data.pagination);
    } catch (e) {
      if (e.response.status === 401) {
        navigate('/login');
      }
    }
    setState((prev) => ({ ...prev, loading: false }));
  };
  const changePage = (pageNum) => {
    getData(pageNum);
  };

  const orderModal = useRef('');
  // const orderDetailModal = useRef('');
  const deleteModal = useRef('');
  useEffect(() => {
    getData();
    // orderDetailModal.current = new Modal('#orderDetailModal');
    orderModal.current = new Modal('#orderModal');
    deleteModal.current = new Modal('#deleteModal');
  }, []);
  // 刪除
  const [deleteData, setDeleteData] = React.useState({
    deleteId: null,
    deleteName: null,
  });
  const handleClose = () => {
    deleteModal.current.hide();
    setDeleteData((preDelete) => ({
      ...preDelete,
      deleteId: null,
      deleteName: null,
    }));
  };
  const openDelete = (id) => {
    deleteModal.current.show();
    setDeleteData((preDelete) => ({
      ...preDelete,
      deleteId: id,
      deleteName: id,
    }));
  };
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${deleteData.deleteId}`, { data: state });
      if (res.data.success) {
        getData();
      }
      handleSuccessMessage(res, dispatch);
    } catch (e) {
      handleErrorMessage(e, dispatch);
    }
    deleteModal.current.hide();
  };
  const [modalData, setModalData] = React.useState({
    type: '',
    data: {},
  });
  const openModal = (type, modalContent) => {
    setModalData((preModal) => ({
      ...preModal,
      type,
      data: modalContent,
    }));
    orderModal.current.show();
  };
  const closeModal = () => {
    setModalData((preModal) => ({
      ...preModal,
      type: '',
      data: {},
    }));
    orderModal.current.hide();
  };
  return (
    <>
      {
        state.loading && <Loading />
      }
      <DeleteModal
        text={`確認要刪除 ${deleteData.deleteName} 這張訂單嗎？`}
        close={handleClose}
        check={handleDelete}
        id="deleteModal"
      />
      <OrderModal
        type={modalData.type}
        data={modalData.data}
        close={closeModal}
        refresh={getData}
        id="orderModal"
      />
      <div className="p-3">
        <h3>訂單管理</h3>
        <hr />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">訂單編號</th>
              <th scope="col">付款狀態</th>
              <th scope="col">付款時間</th>
              <th scope="col">留言</th>
              <th scope="col">付款方式</th>
              <th scope="col">訂單商品</th>
              <th scope="col">訂購人資訊</th>
              <th scope="col">修改訂單</th>
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 && data.map((d) => (
                <tr>
                  <td>{d.id}</td>
                  <td>{d.is_paid ? <span className="text-success fw-bold">付款完成</span> : '未付款'}</td>
                  <td>{new Date(d.paid_date * 1000).toLocaleString('sv-DE')}</td>
                  <td>{d.message}</td>
                  <td>{d.user?.payment}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      type="button"
                      onClick={() => {
                        openModal('product', d.products);
                      }}
                    >
                      查看
                    </button>
                  </td>
                  <td>
                    {d.user?.name}
                    {`(${d.user?.email})`}
                  </td>
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
                      onClick={() => { openDelete(d.id); }}
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

export default Orders;
