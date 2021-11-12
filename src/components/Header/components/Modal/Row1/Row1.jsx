import React, { useEffect, useState, useContext } from "react";
import styles from "../../../Header.module.css";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "bignumber.js";
import AccountContext from "../../../../../Stores/StoreAddress";

const Web3 = require("web3");
const Row1 = () => {
  const accountCtx = useContext(AccountContext);

  const {
    active,
    account,
    library,
    connector,
    activate,
    deactivate,
    chainId,
    error,
  } = useWeb3React();
  const [balance, setBalance] = useState(null);
  useEffect(async () => {
    console.log("ctx: ", accountCtx.account);
    let web3;
    if (chainId === 1) {
      web3 = new Web3(
        "https://speedy-nodes-nyc.moralis.io/8050153ba727567749f63d00/eth/mainnet"
      );
    }
    if (chainId === 4) {
      web3 = new Web3(
        "https://speedy-nodes-nyc.moralis.io/8050153ba727567749f63d00/eth/rinkeby"
      );
    }
    console.log(account);
    const temp = new BigNumber(await web3.eth.getBalance(account))
      .dividedBy(10 ** 18)
      .toFixed(4)
      .toString();
    setBalance(temp);
  }, [chainId, account]);

  // const getBalance = async () => {
  //   return await ;
  // };
  return (
    <div className={styles.offer}>
      <div className={styles.titles}>
        <h3 className="fs-4">Balance</h3>
        <h3 className="fs-4">NetWork</h3>
        <h3 className="fs-4">Wallet</h3>
      </div>
      <div className={styles.listItems}>
        <div className={styles.ListItem}>
          <div className={styles.itemPrice}>{balance} ETH</div>
          <div className={styles.count}>
            {chainId === 4 ? "RINKEBY" : "MAINNET"}
          </div>
          <div className={styles.time}>Metamask</div>
        </div>
      </div>
    </div>
  );
};

export default Row1;
