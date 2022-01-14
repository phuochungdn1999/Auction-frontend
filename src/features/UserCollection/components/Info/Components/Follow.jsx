import React from "react";
import styles from "../Info.module.css";
import BigNumber from "bignumber.js";
const Follow = (props) => {
  const { auction } = props;
  const volumeTrade = () => {
    return auction.reduce((prev, current) => {
      console.log("prev", prev);
      console.log("current", current);
      return parseFloat(current.highestBid) + parseFloat(prev);
    }, 0);
  };
  const participant = () => {
    return auction.reduce((prev, current) => {
      console.log("prev", prev);
      console.log("current", current);
      return parseInt(current.numberOfParticipants) + parseInt(prev);
    }, 0);
  };
  return (
    <div className={styles.FollowWrapper}>
      {console.log(participant())}
      <div className={styles.items}>
        <div className={styles.num}>{auction.length}</div>
        <div className={styles.name}>Items</div>
      </div>
      <div className={styles.owners}>
        <div className={styles.num}>{participant()}</div>
        <div className={styles.name}>Participants</div>
      </div>
      <div className={styles.floorPrice}>
        <div className={styles.num}>
          {volumeTrade() && participant()
            ? new BigNumber(volumeTrade())
                .dividedBy(participant() * 10 ** 18)
                .toFixed(4)
                .toString()
            : "0.000"}
        </div>
        <div className={styles.name}>Floor price</div>
      </div>
      <div className={styles.volumneTraded}>
        <div className={styles.num}>
          {volumeTrade()
            ? new BigNumber(volumeTrade())
                .dividedBy(10 ** 18)
                .toFixed(4)
                .toString()
            : "0.000"}
        </div>
        <div className={styles.name}>Volume traded</div>
      </div>
    </div>
  );
};

export default Follow;
