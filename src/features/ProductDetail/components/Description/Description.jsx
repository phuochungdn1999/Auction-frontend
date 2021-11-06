import React from 'react';
import styles from '../../ProductDetail.module.css';
const Description = (props) => {
  const { product } = props;
  return (
    <div className={styles.col7}>
      <h3 className={styles.headerProductDescription}>Description</h3>
      <div
        className={styles.ProductDescription}
        dangerouslySetInnerHTML={{ __html: product?.description }}
      ></div>
    </div>
  );
};

export default Description;
