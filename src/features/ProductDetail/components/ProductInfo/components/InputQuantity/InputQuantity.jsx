import React, { useEffect, useState } from "react";
import styles from "../../ProductInfo.module.css";
const InputQuantity = () => {
  const [offer, setOffer] = useState("");
  const handleOfferChange = () => {
    setOffer("123");
  };
  return (
    <div className={styles.searchBox}>
      <input
        className={styles.searchTxt}
        type="text"
        name="productName_contains"
        placeholder=" Offer"
        autoComplete="off"
        onChange={handleOfferChange}
      />
    </div>
  );
};

export default InputQuantity;
