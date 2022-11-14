import axios from 'axios';
import React, { useEffect } from 'react';
import Dashboard from '../../components/Admin/Dashboard';
// import ProductsModal from '../../components/Admin/ProductsModal';
import DeleteModal from '../../components/DeleteModal';
import Loading from '../../components/Loading';

function Products() {
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
    const res = await axios(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${p}`);
    setData(res.data.orders);
    setPage(res.data.pagination);
    setState((prev) => ({ ...prev, loading: false }));
  };
  const changePage = (pageNum) => {
    getData(pageNum);
  };
  useEffect(() => {
    getData();
  }, []);

  // 刪除
  const [deleteData, setDeleteData] = React.useState({
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
    setDeleteData((preDelete) => ({
      ...preDelete,
      open: true,
      deleteId: id,
      deleteName: name,
    }));
  };
  const handleDelete = async () => {
    const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${deleteData.deleteId}`, { data: state });
    if (res.data.success) {
      getData();
    }
  };
  return (
    <Dashboard>
      {
        state.loading && <Loading />
      }
      <DeleteModal
        text={`確認要刪除 ${deleteData.deleteName} 嗎？`}
        close={handleClose}
        open={deleteData.open}
        check={handleDelete}
      />
      <div className="p-3">
        <h3>訂單管理</h3>
        <hr />
        {/* <ProductsModal type={state.type} data={state.data} refresh={getData} /> */}
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
                  <td>{d.is_paid ? '付款完成' : '未付款'}</td>
                  <td>{new Date(d.paid_date * 1000).toLocaleString('sv-DE')}</td>
                  <td>{d.user?.message}</td>
                  <td>{d.user?.payment}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary" type="button">查看</button>
                  </td>
                  <td>
                    {d.user?.name}
                    {`(${d.user?.email})`}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#productModal"
                      onClick={() => {
                        setState({ type: 'edit', data: d });
                      }}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
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
    </Dashboard>
  );
}

export default Products;
