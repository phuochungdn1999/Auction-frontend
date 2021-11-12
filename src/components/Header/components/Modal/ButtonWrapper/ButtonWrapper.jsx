import React from 'react';
import styles from './ButtonWrapper.module.css';
import { useWeb3React } from "@web3-react/core";

const ButtonWrapper = () => {
  const {
    active,
    account,
    connector,
    activate,
    deactivate,
    chainId,
    error,
  } = useWeb3React();
  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }
  return (
    <div className={styles.ButtonWrapper}>
      
      <div className={styles.disconnect}>
        <i className="fas fa-sign-out-alt"></i>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    </div>
  );
};

export default ButtonWrapper;
