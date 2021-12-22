import React from "react";
import styles from "../../UserCollection.module.css";
import styles1 from "../../../ProductList/ProductList.module.css";
import { Link } from "react-router-dom";
import formatCash from "../../../../constants/formatPrice";
import BigNumber from 'bignumber.js';

const EachProduct = (props) => {
  const { auction } = props;
  const currentTime = Math.floor(new Date().getTime() / 1000);

  return (
    <div className={styles.home__product}>
      <div className={styles.grid__row}>
        {auction.map((item) => (
          <Link
            to={`/detail/${item.id}`}
            key={item.id}
            className={styles.grid__column24}
          >
            <div className={styles1.home__productitems}>
              <div
                className={styles1.home__productitemsimg}
                style={{
                  backgroundImage: `url(${item.imageLogo})`,
                }}
              ></div>
              <h4 className={styles1.home__productitemsname}>{item.name}</h4>

              <div className={styles1.home__productprice}>
                <div className={styles1.wrapperPrice}>
                  <span className={styles1.home__productitemsprice}>
                    {new BigNumber(item.highestBid).dividedBy(10**18).toFixed(4).toString()}
                  </span>
                  <div className={styles1.imgWrapper}>
                    <img
                      src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                      alt="img"
                      className={styles1.imgPrice}
                    />
                  </div>
                </div>
                <div className={styles1.status}>
                  {currentTime >= item.start && currentTime <= item.end ? (
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
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EachProduct;
