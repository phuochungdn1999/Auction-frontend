import React from 'react';
import styles from './ButtonWrapper.module.css';
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';

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
  const history = useHistory();

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
      <div className={styles.disconnect}>
        <i className="fas fa-sign-out-alt" ></i>
        <Link class="font-weight-normal" to={`/admin`}>ADMIN PAGE</Link>
      </div>
    </div>
  );
};

export default ButtonWrapper;
