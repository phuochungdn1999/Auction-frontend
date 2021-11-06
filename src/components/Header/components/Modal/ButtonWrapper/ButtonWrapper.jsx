import React from 'react';
import styles from './ButtonWrapper.module.css';
const ButtonWrapper = () => {
  return (
    <div className={styles.ButtonWrapper}>
      <div className={styles.switchWallet}>
        <i class="fas fa-random"></i>
        <button>Switch Wallet</button>
      </div>
      <div className={styles.disconnect}>
        <i class="fas fa-sign-out-alt"></i>
        <button>Disconnect</button>
      </div>
    </div>
  );
};

export default ButtonWrapper;
