import React, { useState, useEffect } from "react";
import styles from './List1.module.css';
import { useHistory } from 'react-router';
import axios from "axios";
const BigNumber = require("bignumber.js");

const List1 = () => {
  const history = useHistory();
  const [auction, setAuction] = useState([]);
  const currentTime = Math.floor(new Date().getTime() / 1000);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
      const getApi = `http://localhost:3002/auctions/top`;
      console.log("api", getApi);
      const res = await axios.get(getApi);
      console.log(res.data.data.auctions);
      setAuction(res.data.data.auctions)
  }, []);
  
  return (
    <div className={styles.List}>
      {auction.map((item,index) => (
        <div
          className={styles.item}
          onClick={() => {
            history.push(`/detail/${item.id}`);
          }}
        >
          <div className={styles.info}>
            <div className={styles.num}>{index+1}</div>
            <img src={item.imageLogo} alt="ava" className={styles.ava} />
            <div className={styles.containInfo}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.collection}>
                <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="anhr"
                />
                <div className={styles.collectionNum}>{new BigNumber(item.highestBid).dividedBy(10**18).toString()}</div>
              </div>
            </div>
          </div>
          <div className={styles.collection1}>
            <div className={styles.Num}>{currentTime >= item.start && currentTime <= item.end ? (
                    <div
                      className={styles.status}
                      class="badge bg-success text-wrap"
                    >
                      Live
                    </div>
                  ) : currentTime < item.start ? (
                    <div
                      className={styles.status}
                      class="badge bg-warning text-wrap"
                    >
                      Upcoming
                    </div>
                  ) : (
                    <div
                      className={styles.status}
                      class="badge bg-secondary text-wrap"
                    >
                      Closed
                    </div>
                  )}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List1;
