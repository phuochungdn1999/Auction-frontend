import React from 'react';
import styles from '../../UserCollection.module.css';
import { Link } from 'react-router-dom';
import formatCash from '../../../../constants/formatPrice';
const EachProduct = (props) => {
  const { product } = props;
  return (
    <div className={styles.home__product}>
      <div className={styles.grid__row}>
        {product.map((item) => (
          <Link
            to={`/detail/${item.id}`}
            key={item.id}
            className={styles.grid__column24}
          >
            <div className={styles.home__productitems}>
              <div
                className={styles.home__productitemsimg}
                style={{
                  backgroundImage: `url(${item.thumbnail})`,
                }}
              ></div>
              <h4 className={styles.home__productitemsname}>{item.name}</h4>

              <div className={styles.home__productprice}>
                <div className={styles.wrapperPrice}>
                  <span className={styles.home__productitemsprice}>
                    {formatCash(item.sale_price.toString())}
                  </span>
                  <div className={styles.imgWrapper}>
                    <img
                      src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                      alt="img"
                      className={styles.imgPrice}
                    />
                  </div>
                </div>
                <div className={styles.status}>Live</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EachProduct;
