import { useTheme } from "@/shared/lib";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  windowSize?: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  windowSize = 10,
}: PaginationProps) => {
  const { isDark } = useTheme();

  let startPage = Math.max(1, currentPage - Math.floor(windowSize / 2));
  let endPage = startPage + windowSize - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - windowSize + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };
  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };
  const handlePageChange = (page: number) => () => {
    onPageChange(page);
  };

  return (
    <nav
      aria-label="Пагинация"
      className={`${styles.pagination} ${isDark ? styles.dark : ""}`}
    >
      <button
        type="button"
        className={styles.button}
        onClick={handlePrevPage}
        disabled={currentPage <= 1}
      >
        &lt;
      </button>
      {pages.map(page => (
        <button
          type="button"
          key={page}
          onClick={handlePageChange(page)}
          className={`${styles.button} ${
            page === currentPage ? styles.active : ""
          }`}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className={styles.button}
        onClick={handleNextPage}
        disabled={currentPage >= totalPages}
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
