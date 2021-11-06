import styles from './ProductInfo.module.css';
import React from 'react';
import formatCash from '../../../../constants/formatPrice';
import InputQuantity from './components/InputQuantity/InputQuantity';
function ProductInfo(props) {
  const { product } = props;
  const salePrice = (product.sale_price * product.discount) / 100;
  const Price = product.sale_price - salePrice;
  return (
    <div className={styles.info}>
      <div className={styles.infoWrapper}>
        <h4 className={styles.ProductName}>{product?.name}</h4>
        <h5 className={styles.ProductBand}>
          Owner by <span>{product?.brand?.name}</span>{' '}
        </h5>
        <div className={styles.title}>Current Price</div>
        <div className={styles.ProductPriceSale}>
          <img
            src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
            alt="eth"
          />
          <div className={styles.priceItem}>{formatCash(`${Price}`)}</div>
        </div>
      </div>
      <div className={styles.ProductCartWapper}>
        <div className={styles.containBtn}>
          <InputQuantity />
          <button className={styles.button}>MAKE OFFER</button>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
