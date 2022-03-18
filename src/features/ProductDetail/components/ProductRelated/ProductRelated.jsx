/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProductRelated.module.css';
import { Link } from 'react-router-dom';
import formatCash from '../../../../constants/formatPrice';
const  BigNumber = require("bignumber.js");

function ProductRelated(props) {
  const [products, setProducts] = useState([]);
  useEffect(async() => {
    const getApi = `http://localhost:3002/auctions/related`;
    const response = await axios.get(getApi);
    setProducts(response.data.data.auctions);

    
  }, []);
  return (
    <div className={styles}>
      <h2 className={styles.header}>Related Products</h2>
      <div className={styles.grid__column10}>
        <div className={styles.home__product}>
          <div className={styles.grid__row}>
            {products.map((item) => (
              <div key={item.id} className={styles.grid__column24}>
                <Link
                  to={`/detail/${item.id}`}
                  className={styles.home__productitems}
                >
                  <div
                    className={styles.home__productitemsimg}
                    style={{ backgroundImage: `url(${item.imageLogo})` }}
                  ></div>
                  <h4 className={styles.home__productitemsname}>{item.name}</h4>
                  <div className={styles.home__productprice}>
                    {/* <span className={styles.home__productitemsprice}>
                    {new BigNumber(item.highestBid).dividedBy(10**18).toString()}

                    </span> */}
                    <div className={styles.btn_cart}>
                      <i className="fas fa-search"></i>
                      Details
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductRelated;
