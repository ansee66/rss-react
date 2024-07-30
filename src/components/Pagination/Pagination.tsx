import './Pagination.css';

export type PaginationPropsType = {
  count: number;
  currentPage: number;
  setPage: (page: number) => void;
};

const Pagination = ({ count, currentPage, setPage }: PaginationPropsType) => {
  const ITEMS_PER_PAGE = 10;
  const pageAmount = Math.ceil(count / ITEMS_PER_PAGE);
  const pageArray = new Array(pageAmount)
    .fill(pageAmount)
    .map((_, index) => index + 1);

  return (
    <ul className="pagination">
      {pageArray.map((page: number) => {
        return (
          <li key={page}>
            <button
              className="pagination__button"
              disabled={page === currentPage}
              onClick={() => {
                setPage(page);
              }}
            >
              {page}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
