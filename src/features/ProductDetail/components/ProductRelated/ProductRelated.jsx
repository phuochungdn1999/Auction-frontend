import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProductRelated.module.css';
import { Link } from 'react-router-dom';
import formatCash from '../../../../constants/formatPrice';
function ProductRelated(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getApi = `https://yshuynh.pythonanywhere.com/api/products`;
    axios.get(getApi).then((response) => {
      setProducts(response.data.results);
    });
  }, []);
  return (
    <div className={styles}>
      <h2 className={styles.header}>Sản phẩm liên quan</h2>
      <div className={styles.grid__column10}>
        <div className={styles.home__product}>
          <div className={styles.grid__row}>
            {products.map((item) => (
              <div key={item.id} className={styles.grid__column24}>
                <Link
                  to={`/productDetail/${item.id}`}
                  className={styles.home__productitems}
                >
                  <div
                    className={styles.home__productitemsimg}
                    style={{ backgroundImage: `url(${item.thumbnail})` }}
                  ></div>
                  <h4 className={styles.home__productitemsname}>{item.name}</h4>
                  <div className={styles.home__productprice}>
                    <span className={styles.home__productitemsprice}>
                      {formatCash(item.sale_price.toString())} đ
                    </span>
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
