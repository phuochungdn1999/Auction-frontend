import React from "react";
import styles from "../../ProductDetail.module.css";
const Description = (props) => {
  const { auction } = props;
  return (
    <div className={styles.col7}>
      <p className={styles.headerProductDescription} class="fs-1">
        Description
      </p>
      <div
        className={styles.ProductDescription}
        class="d-flex"
        dangerouslySetInnerHTML={{ __html: auction?.description }}
      ></div>
    </div>
  );
};

export default Description;
