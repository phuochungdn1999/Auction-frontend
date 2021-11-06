import React from 'react';
import styles from './Search.module.css';
import PropTypes from 'prop-types';

const Search = ({ onChange }) => {
  return (
    <div>
      <form>
        <div className={styles.searchBox}>
          <input
            className={styles.searchTxt}
            type="text"
            name="productName_contains"
            placeholder="Type to search"
            autoComplete="off"
          />
          <div type="submit" className={styles.searchBtn}>
            <i className="fas fa-search"></i>
          </div>
        </div>
      </form>
    </div>
  );
};
Search.propTypes = {
  onChange: PropTypes.func,
};
export default Search;
