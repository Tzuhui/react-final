import React, { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';
import { useDispatch } from 'react-redux';
import CouponsModal from '../../components/Admin/CouponsModal';
import DeleteModal from '../../components/DeleteModal';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import { handleSuccessMessage } from '../../slice/messageSlice';
import { useGetCouponQuery, useDeleteCouponMutation } from '../../services/admin';

function Coupons() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [state, setState] = React.useState({
    type: 'create',
    data: {},
    loading: true,
  });
  const [page, setPage] = React.useState({
    category: '',
    current_page: 1,
    has_next: false,
    has_pre: false,
    total_pages: 1,
  });
  const { data: coupons, isLoading } = useGetCouponQuery(page.current_page);

  const couponModal = useRef('');
  const deleteModal = useRef('');
  useEffect(() => {
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
  const [deleteMethod, { isLoading: isDeleting }] = useDeleteCouponMutation();
  const handleDelete = async () => {
    try {
      const res = await deleteMethod(deleteData.deleteId);
      if (res.data.success) {
        deleteModal.current.hide();
      }
      dispatch(handleSuccessMessage(res.data));
    } catch (e) {
      console.log(e);
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
        (isLoading || isDeleting) && <Loading />
      }
      <DeleteModal
        id="deleteModal"
        text={`確認要刪除 ${deleteData.deleteName} 嗎？`}
        close={handleClose}
        check={handleDelete}
      />
      <CouponsModal id="couponModal" type={state.type} coupon={state.data} close={closeModal} />
      <div className="p-3">
        <h3>優惠券列表</h3>
        <hr />
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
              <th scope="col">標題</th>
              <th scope="col">折扣</th>
              <th scope="col">到期日</th>
              <th scope="col">優惠碼</th>
              <th scope="col">是否啟用</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {
              coupons?.coupons && coupons?.coupons?.length > 0 && coupons?.coupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td>{coupon.title}</td>
                  <td>{coupon.percent}</td>
                  <td>{new Date(coupon.due_date).toLocaleDateString()}</td>
                  <td>{coupon.code}</td>
                  <td>{coupon.is_enabled ? '啟用' : '未啟用'}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        openModal('edit', coupon);
                      }}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => { openDelete(coupon.id, coupon.title); }}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Pagination
          page={page}
          changePage={() => {
            setPage(((prev) => ({
              ...prev,
              current_page: page.current_page + 1,
            })));
          }}
        />
      </div>
    </>
  );
}

export default Coupons;
