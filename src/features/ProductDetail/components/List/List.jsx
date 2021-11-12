import React from "react";
import styles from "./List.module.css";
const List = () => {
  return (
    <div className={styles.offer}>
      <div className={styles.name}>
        <i className="fas fa-list-ul"></i>Offers
      </div>
      <div className={styles.titles}>
        <h3 className={styles.price}>Unit Price</h3>
        <h3 className={styles.status}>Address</h3>
        <h3 className={styles.time}>Time</h3>
      </div>
      <div className={styles.listItems}>
        <div className={styles.ListItem}>
          <div className={styles.itemPrice}>
            <img
              src="https://storage.opensea.io/files/accae6b6fb3888cbff27a013729c22dc.svg"
              alt="WETH"
            />
            0,4 WETH
          </div>
          <div className={styles.count}>KingofChateau</div>
          <div className={styles.time}>12212123123 đ</div>
        </div>
        <div className={styles.ListItem}>
          <div className={styles.itemPrice}>
            <img
              src="https://storage.opensea.io/files/accae6b6fb3888cbff27a013729c22dc.svg"
              alt="WETH"
            />
            0,4 WETH
          </div>
          <div className={styles.count}>KingofChateau</div>
          <div className={styles.time}>12212123123 đ</div>
        </div>
        <div className={styles.ListItem}>
          <div className={styles.itemPrice}>
            <img
              src="https://storage.opensea.io/files/accae6b6fb3888cbff27a013729c22dc.svg"
              alt="WETH"
            />
            0,4 WETH
          </div>
          <div className={styles.count}>KingofChateau</div>
          <div className={styles.time}>12212123123 đ</div>
        </div>
        <div className={styles.ListItem}>
          <div className={styles.itemPrice}>
            <img
              src="https://storage.opensea.io/files/accae6b6fb3888cbff27a013729c22dc.svg"
              alt="WETH"
            />
            0,4 WETH
          </div>
          <div className={styles.count}>KingofChateau</div>
          <div className={styles.time}>12212123123 đ</div>
        </div>
        <div className={styles.ListItem}>
          <div className={styles.itemPrice}>
            <img
              src="https://storage.opensea.io/files/accae6b6fb3888cbff27a013729c22dc.svg"
              alt="WETH"
            />
            0,4 WETH
          </div>
          <div className={styles.count}>KingofChateau</div>
          <div className={styles.time}>12212123123 đ</div>
        </div>
        <div className={styles.ListItem}>
          <div className={styles.itemPrice}>
            <img
              src="https://storage.opensea.io/files/accae6b6fb3888cbff27a013729c22dc.svg"
              alt="WETH"
            />
            0,4 WETH
          </div>
          <div className={styles.count}>KingofChateau</div>
          <div className={styles.time}>12212123123 đ</div>
        </div>
      </div>
    </div>
  );
};

export default List;
