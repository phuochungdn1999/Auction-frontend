import React, { useState, useEffect } from "react";
import styles from "./List.module.css";
import axios from "axios";

const List = (props) => {
  const { auction } = props;
  const [listOffer, setListOffer] = useState([]);

  useEffect(async () => {
    const getApi = `http://localhost:3001/offers/auction/${auction.id}`;
    console.log("list", getApi);
    const data = await axios(getApi);
    console.log("list", data);
    setListOffer(data.data.data);
  }, []);
  return (
    <div className={styles.offer}>
      <div className={styles.name}>
        <i className="fas fa-list-ul"></i>Offers
      </div>
      <div className={styles.titles}>
        <p className={styles.price} class="fs-4">
          Unit Price
        </p>
        <p className={styles.status} class="fs-4">
          Address
        </p>
        <p className={styles.time} class="fs-4">
          Time   
        </p>
      </div>

      <div className={styles.listItems}>
        {listOffer.map((item) => (
          <div className={styles.ListItem}>
            <div className={styles.itemPrice}>
              <img
                src="https://storage.opensea.io/files/accae6b6fb3888cbff27a013729c22dc.svg"
                alt="WETH"
              />
              {item.amount} ETH
            </div>
            <div className={styles.count}>
              0x{item.walletId[2]}
              {item.walletId[3]}
              {item.walletId[4]}...{item.walletId[39]}
              {item.walletId[40]}
              {item.walletId[41]}
            </div>
            <div className={styles.time}>
              {new Date(item.createdAt).toDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
