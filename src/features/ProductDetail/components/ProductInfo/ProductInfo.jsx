import styles from "./ProductInfo.module.css";
import React, { useEffect, useState, useContext } from "react";
import formatCash from "../../../../constants/formatPrice";
import { useHistory } from "react-router";
import AccountContext from "../../../../Stores/StoreAddress";
import axios from "axios";
const Web3 = require("web3");
const auctionAbi = require("../.");

function ProductInfo(props) {
  const history = useHistory();
  const accountCtx = useContext(AccountContext);

  const { auction } = props;
  // const salePrice = (product.sale_price * product.discount) / 100;
  const Price = auction.highestBid;

  const [offer, setOffer] = useState("");
  const handleOfferChange = (event) => {
    setOffer(event.target.value);
  };
  const handleSubmit = async () => {
    


    const obj = {
      walletId: accountCtx.account,
      auctionId: auction.id,
      amount: offer,
    };


    console.log(obj);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accountCtx.token}`,
    };
    const data = await axios.post("http://localhost:3001/offers", obj, {
      headers: headers,
    });
    console.log(data);
  };
  return (
    <div className={styles.info}>
      <div className={styles.infoWrapper}>
        <h4 className={styles.ProductName}>{auction?.name}</h4>
        <h5 className={styles.ProductBand}>
          Owner by{" "}
          <span
            class="link-info"
            onClick={() => {
              history.push("/userCollection");
            }}
          >
            {auction.owner}
          </span>{" "}
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
          <div className={styles.searchBox}>
            {console.log("offer", offer)}
            <input
              className={styles.searchTxt}
              type="text"
              name="productName_contains"
              placeholder=" Offer"
              autoComplete="off"
              onChange={handleOfferChange}
            />
          </div>
          {console.log("account", accountCtx.account)}
          {console.log("account", offer.length)}
          {console.log("account", offer.length !== 0)}
          {offer.length !== 0 &&
          parseFloat(offer) > auction.highestBid &&
          accountCtx.account ? (
            <button className={styles.button} onClick={handleSubmit}>
              MAKE OFFER
            </button>
          ) : (
            <button className={styles.button} disabled="true">
              MAKE OFFER
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
