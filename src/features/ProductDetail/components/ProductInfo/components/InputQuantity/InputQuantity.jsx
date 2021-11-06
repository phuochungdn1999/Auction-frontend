import React from 'react';
import styles from '../../ProductInfo.module.css';
const InputQuantity = () => {
  return (
    <div className={styles.searchBox}>
      <input
        className={styles.searchTxt}
        type="text"
        name="productName_contains"
        placeholder="Type to Make a Offer"
        autoComplete="off"
      />
    </div>
  );
};

export default InputQuantity;
