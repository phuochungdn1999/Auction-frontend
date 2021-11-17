import React from "react";
import PropTypes from "prop-types";
import styles from "./Pagination.module.css";
const Pagination = ({ pagination, onPageChange }) => {
  const { currentPage, limit, total } = pagination;
  const totalPages = Math.ceil(total / limit);
  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }
  return (
    <div>
      <button
        className={styles.button}
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <i className="fas fa-angle-left"></i>
      </button>
      <span>{currentPage}</span>
      <button
        className={styles.button}
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <i className="fas fa-angle-right"></i>
      </button>
    </div>
  );
};
Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};
Pagination.defaultProps = {
  onPageChange: null,
};

export default Pagination;
