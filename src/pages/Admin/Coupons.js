import React, { useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'bootstrap';
import CouponsModal from '../../components/Admin/CouponsModal';
import DeleteModal from '../../components/DeleteModal';
import Loading from '../../components/Loading';
import { MessageContext, handleErrorMessage, handleSuccessMessage } from '../../store';

function Coupons() {
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
      const res = await axios(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${p}`);
      setData(res.data.coupons);
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
  useEffect(() => {
    getData();
  }, []);
  const column = [{
    name: '標題',
    key: 'title',
  },
  {
    name: '數量',
    key: 'is_enabled',
  }, {
    name: '折扣（%）',
    key: 'percent',
  }, {
    name: '到期日',
    key: 'due_date',
  }, {
    name: '優惠碼',
    key: 'code',
  }];
  const couponModal = useRef('');
  const deleteModal = useRef('');
  useEffect(() => {
    getData();
    couponModal.current = new Modal('#couponModal');
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
  const openDelete = (id, name) => {
    deleteModal.current.show();
    setDeleteData((preDelete) => ({
      ...preDelete,
      deleteId: id,
      deleteName: name,
    }));
  };
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${deleteData.deleteId}`, { data: state });
      if (res.data.success) {
        getData();
        deleteModal.current.hide();
      }
      handleSuccessMessage(res, dispatch);
    } catch (e) {
      handleErrorMessage(e, dispatch);
    }
  };

  const openModal = (type, item) => {
    couponModal.current.show();
    setState({ type, data: item });
  };
  const closeModal = () => {
    couponModal.current.hide();
    setState({ type: '', data: {} });
  };
  return (
    <>
      {
        state.loading && <Loading />
      }
      <DeleteModal
        id="deleteModal"
        text={`確認要刪除 ${deleteData.deleteName} 嗎？`}
        close={handleClose}
        check={handleDelete}
      />
      <div className="p-3">
        <h3>優惠券列表</h3>
        <hr />
        <CouponsModal id="couponModal" type={state.type} data={state.data} close={closeModal} refresh={getData} />
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => {
            openModal('create', {});
          }}
        >
          建立新優惠券
        </button>
        <table className="table">
          <thead>
            <tr>
              {
                column.map((c, i) => <th key={`tr_${i + 1}`} scope="col">{c.name}</th>)
              }
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 && data.map((d, i) => (
                <tr key={`coupon_1_${i + 1}`}>
                  {
                    column.map((c, index) => <td key={`coupon_2_${index + 1}`}>{d[c.key]}</td>)
                  }
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

export default Coupons;
