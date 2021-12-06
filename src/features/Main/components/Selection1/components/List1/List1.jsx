import React, { useState, useEffect } from "react";
import styles from './List1.module.css';
import { useHistory } from 'react-router';
import axios from "axios";
const BigNumber = require("bignumber.js");

const List1 = () => {
  const history = useHistory();
  const [offers, setOffers] = useState([]);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
      const getApi = `http://localhost:3002/offers/top`;
      console.log("api", getApi);
      const res = await axios.get(getApi);
      console.log(res.data);
      setOffers(res.data.data)
  }, []);
  
  return (
    <div className={styles.List}>
      {offers.map((item,index) => (
        <div
          className={styles.item}
          onClick={() => {
            history.push(`/userCollection/${item.walletId}`);
          }}
        >
          <div className={styles.info}>
            <div className={styles.num}>{index+1}</div>
            <img src='https://media.istockphoto.com/photos/adorable-scottish-straight-cat-peeking-from-behind-a-banner-picture-id1097008888?k=20&m=1097008888&s=612x612&w=0&h=7g68qF4AnyJSd3-t4jnc9MO2AqqE5kCHEX50rTLxF_Q=' alt="ava" className={styles.ava} />
            <div className={styles.name}>{`0x${item.walletId[2]}${item.walletId[3]}${item.walletId[4]}..${item.walletId[item.walletId.length-4]}${item.walletId[item.walletId.length-3]}${item.walletId[item.walletId.length-2]}${item.walletId[item.walletId.length-1]}`}</div>
          </div>
          <div className={styles.collection}>
            <img
              src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
              alt="anhr"
            />
            <div className={styles.collectionNum}>{new BigNumber(item.amount).dividedBy(10**18).toString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List1;
