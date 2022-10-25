import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';

function Products() {
  const { productId } = useParams();
  const [data, setData] = React.useState([]);
  const getData = async (id) => {
    // setState((prev) => ({ ...prev, loading: true }));
    const res = await axios(`/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`);
    setData(res.data.product);
    // setState((prev) => ({ ...prev, loading: false }));
  };
  useEffect(() => {
    getData(productId);
  }, [productId]);
  return (
    <>
      <Header />
      <div className="container">
        <div className="row justify-content-between mt-4 mb-7">
          <div className="col-md-6">
            <img src={data.imageUrl || 'https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1916&amp;q=80'} alt="" className="img-fluid" />
            {data?.imagesUrl && data.imagesUrl.length > 0 && (
            <div className="my-4">
              <div className="row">
                {data.imagesUrl.map((i) => (
                  <div className="col-md-4">
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
              <input type="text" className="form-control text-center my-auto shadow-none" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" value="1" />
            </div>
            <a href="./checkout.html" className="btn btn-dark btn-block rounded-0 w-100">加入購物車</a>
          </div>
        </div>
        <hr />
        <div>
          <h3>猜你也喜歡...</h3>
        </div>
      </div>
    </>
  );
}

export default Products;
