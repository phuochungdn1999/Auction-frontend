import React from 'react';
import PropTypes from 'prop-types';
import styles from './Pagination.module.css';
const Pagination = ({ pagination, onPageChange }) => {
  const { page, page_size, total } = pagination;
  const totalPages = Math.ceil(total / page_size);
  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }
  return (
    <div>
      <button
        className={styles.button}
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <i className="fas fa-angle-left"></i>
      </button>
      <span>{page}</span>
      <button
        className={styles.button}
        disabled={page >= totalPages}
        onClick={() => handlePageChange(page + 1)}
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
