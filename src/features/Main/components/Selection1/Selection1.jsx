import React from 'react';
import List1 from './components/List1/List1';
import styles from './Selection1.module.css';
const Selection1 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.Selection}>
        <div className={styles.header}>Top User</div>
        <div className={styles.list}>
          <List1 />
          {/* <List2 />
          <List3 /> */}
        </div>
      </div>
    </div>
  );
};

export default Selection1;
