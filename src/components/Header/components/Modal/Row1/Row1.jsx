import React from 'react';
import styles from '../../../Header.module.css';
const Row1 = () => {
  return (
    <div className={styles.offer}>
      <div className={styles.titles}>
        <h3 className={styles.price}>Balance</h3>
        <h3 className={styles.status}>NetWork</h3>
        <h3 className={styles.time}>Wallet</h3>
      </div>
      <div className={styles.listItems}>
        <div className={styles.ListItem}>
          <div className={styles.itemPrice}>12.82 ETH</div>
          <div className={styles.count}>Rinkeby</div>
          <div className={styles.time}>Metamask</div>
        </div>
      </div>
    </div>
  );
};

export default Row1;
