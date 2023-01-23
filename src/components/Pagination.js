import React from 'react';

function Pagination({ page, changePage }) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a className={`page-link ${!page.has_pre && 'disabled'}`} href="/" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {
        [...new Array(page.total_pages)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className="page-item" key={`${i}_page`}>
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
  );
}

export default Pagination;
