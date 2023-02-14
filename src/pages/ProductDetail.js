import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Loading from '../components/Loading';
import { useGetProductsQuery, useGetProductQuery, useAddCartMutation } from '../services/products';

function Products() {
  const { productId } = useParams();
  const [data, setData] = React.useState([]);
  const [recommendData, setRecommendData] = React.useState([]);
  const [state, setState] = React.useState({
    category: '',
    qty: 1,
  });
  // 取得商品資料
  const { data: productData, isLoading } = useGetProductQuery(productId || skipToken);
  useEffect(() => {
    if (productData) {
      setData(productData.product);
      setState((prev) => ({ ...prev, category: productData.product.category }));
    }
  }, [productData]);

  // 推薦商品
  const { data: categoryData } = useGetProductsQuery(productId && state.category !== '' ? {
    page: 1,
    category: state.category,
  } : skipToken);
  useEffect(() => {
    if (categoryData) {
      const filterNowData = categoryData.products.filter((p) => p.id !== productId);
      setRecommendData(filterNowData.slice(0, 3));
    }
  }, [categoryData]);

  // 加入購物車
  const [addCart, result] = useAddCartMutation();
  const addToCart = async () => {
    await addCart({
      data: {
        product_id: productId,
        qty: parseInt(state.qty, 10),
      },
    });
  };
  return (
    <>
      { isLoading ? <Loading /> : '' }
      <div className="container">
        <div className="row justify-content-between mt-4 mb-7">
          <div className="col-md-6">
            <img src={data.imageUrl || 'https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1916&amp;q=80'} alt="" className="img-fluid" />
            {data?.imagesUrl && data.imagesUrl.length > 0 && (
            <div className="my-4">
              <div className="row">
                {data.imagesUrl.map((i) => (
                  <div className="col-md-4" key={`detail_${i}`}>
                    <img src={i || 'https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1916&amp;q=80'} alt="" className="img-fluid mt-4" style={{ height: '150px', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
            )}

          </div>
          <div className="col-md-6">
            <h2 className="mb-2">{data.title}</h2>
            <p>{data.description}</p>
            <hr />
            <p className="mb-1">詳細說明</p>
            <p style={{ whiteSpace: 'break-spaces' }}>{data.content}</p>
            <hr />
            <p className="mb-1 text-end">
              <del>
                NT$
                {' '}
                {data.origin_price}
              </del>
            </p>
            <h4 className="fw-bold text-end">
              NT$
              {' '}
              {data.price}
            </h4>
            <div className="my-2">
              <select
                name=""
                id=""
                className="form-select"
                value={state.qty}
                onChange={(e) => { setState((prev) => ({ ...prev, qty: e.target.value })); }}
              >
                {[...Array(20)].map((_, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <option value={i + 1} key={i}>{i + 1}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="btn btn-dark btn-block rounded-0 w-100"
              onClick={addToCart}
              disabled={result.isLoading}
            >
              加入購物車
            </button>
          </div>
        </div>
        <hr />
        <div>
          <h3>猜你也喜歡...</h3>
          <div className="row">
            {
        recommendData.map((d) => (
          <div className="col-md-4 mt-md-4" key={`recommend_${d.id}`}>
            <div className="card border-0 mb-4 position-relative position-relative">
              <img
                src={d.imageUrl}
                className="card-img-top rounded-0"
                style={{ height: '250px', objectFit: 'cover' }}
                alt={d.title}
              />
              <div className="card-body p-0">
                <h4 className="mb-0 mt-4">{d.title}</h4>
                <div className="d-flex justify-content-between align-items-start mt-3">
                  <p className="card-text text-muted mb-0 w-75">
                    {d.description}
                  </p>
                  <NavLink
                    to={`/product/${d.id}`}
                    className="btn btn-outline-dark rounded-0 text-nowrap"
                  >
                    詳細介紹
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        ))
      }
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
