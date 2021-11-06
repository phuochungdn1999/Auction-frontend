import React from 'react';
import styles from './ImportImg.module.css';
const Importimg = () => {
  return (
    <div className={styles.wrappers}>
      <button className={styles.uploadImg} type="submit">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRJYp_2xLxb-MQjJmwBEjkEJzrHwiPvTIXgQ&usqp=CAU"
          alt="img"
        />
      </button>
    </div>
  );
};

export default Importimg;
