import React from 'react';
import styles from '../Info.module.css';
const Follow = () => {
  return (
    <div className={styles.FollowWrapper}>
      <div className={styles.items}>
        <div className={styles.num}>10.0K</div>
        <div className={styles.name}>items</div>
      </div>
      <div className={styles.owners}>
        <div className={styles.num}>4.8K</div>
        <div className={styles.name}>owners</div>
      </div>
      <div className={styles.floorPrice}>
        <div className={styles.num}>0.725</div>
        <div className={styles.name}>floor price</div>
      </div>
      <div className={styles.volumneTraded}>
        <div className={styles.num}>2.9K</div>
        <div className={styles.name}>volume traded</div>
      </div>
    </div>
  );
};

export default Follow;
