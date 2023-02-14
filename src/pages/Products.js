import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../components/Loading';
import { useGetProductsQuery } from '../services/products';

function Products() {
  const categoryList = ['飲料', '甜點', '熱食', '健康便當'];
  const [page, setPage] = React.useState({
    current_page: 1,
    has_next: false,
    has_pre: false,
    total_pages: 1,
  });
  const [state, setState] = React.useState({
    category: '',
    loading: false,
  });
  const { data: products, isLoading } = useGetProductsQuery({
    page: page.current_page,
    category: state.category,
  });
  const handleCategoryChange = (value) => {
    setState((prev) => ({ ...prev, category: value === '全部' ? '' : value }));
  };

  useEffect(() => {
    if (products) {
      setPage((prev) => ({
        ...prev,
        ...products.pagination,
      }));
    }
  }, [products]);
  return (
    <>
      {
        isLoading && <Loading />
      }
      <nav className="navbar navbar-expand-lg navbar-light justify-content-center border border-start-0 border-end-0 border-top border-bottom">
        <div className="navbar-nav flex-row overflow-auto navbar-custom-scroll">
          <a onClick={(e) => { e.preventDefault(); handleCategoryChange('全部'); }} className={`nav-item nav-link text-nowrap px-2 ${state.category === '' && 'active'}`} href="/">
            全部
          </a>
          {
            categoryList.map((c) => (
              <a key={`p_${c}`} onClick={(e) => { e.preventDefault(); handleCategoryChange(c); }} className={`nav-item nav-link text-nowrap px-2 ${state.category === c && 'active'}`} href="/">
                {c}
              </a>
            ))
          }
        </div>
      </nav>
      <div className="container mt-md-5 mt-3 mb-7" style={{ minHeight: 'calc(100vh - 300px)' }}>
        <div className="row">
          {
            products && products.products.map((d) => (
              <div className="col-md-3" key={`product_${d.id}`}>
                <NavLink className="link-dark text-decoration-none" to={`/product/${d.id}`}>
                  <div className="card border-0 mb-4 position-relative position-relative">
                    <img
                      src={d.imageUrl}
                      className="card-img-top rounded-0"
                      style={{ height: '200px', objectFit: 'cover' }}
                      alt="..."
                    />
                    <div className="card-body p-0">
                      <h4 className="mb-0 mt-3">
                        {d.title}
                      </h4>
                      <p className="card-text text-muted mb-0">
                        {d.description}
                      </p>
                      <div className="d-flex align-items-center">
                        <p className="mt-2 me-2">
                          NT$
                          {' '}
                          {d.price}
                        </p>
                        {
                          !!d.origin_price && (
                            <p className="small text-muted mt-2">
                              <del>
                                (NT$
                                {' '}
                                {d.origin_price}
                                )
                              </del>
                            </p>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))
          }
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className={`page-link ${!page.has_pre && 'disabled'}`} href="/" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {
              [...new Array(page.total_pages)].map((_, i) => (
                <li className="page-item" key={`page_${i + 1}`}>
                  <a
                    className={`page-link ${(i + 1 === page.current_page) && 'active'}`}
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(((prev) => ({
                        ...prev,
                        current_page: i + 1,
                      })));
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
      <div className="bg-dark">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between text-white py-4">
            <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
