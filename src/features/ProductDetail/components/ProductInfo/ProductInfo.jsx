import styles from "./ProductInfo.module.css";
import React, { useEffect, useState, useContext } from "react";
import formatCash from "../../../../constants/formatPrice";
import { useHistory } from "react-router";
import AccountContext from "../../../../Stores/StoreAddress";
import axios from "axios";
import BigNumber from "bignumber.js";
const Web3 = require("web3");
const auctionAbi = require("../../../../abi/auction.json");

function ProductInfo(props) {
  const history = useHistory();
  const accountCtx = useContext(AccountContext);

  const { auction } = props;
  // const salePrice = (product.sale_price * product.discount) / 100;
  const Price = new BigNumber(auction.highestBid)
    .dividedBy(10 ** 18)
    .toString();

  const [offer, setOffer] = useState("");
  const [address, setAddress] = useState("");
  
  const handleOfferChange = (event) => {
    setOffer(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async () => {
    const web3 = new Web3(accountCtx.rpc);
    const contractAddress = "0x38BC9d1C2bBC75A857261bc206133B58b7d0Cadb";
    const contractERC721 = new web3.eth.Contract(auctionAbi, contractAddress);
    console.log("id", auction.id);
    const makeOfferMethod = contractERC721.methods
      .makeOffer(auction.id)
      .encodeABI();
    console.log(
      "number",
      new BigNumber(offer).multipliedBy(10 ** 18).toString()
    );
    console.log("number", auction.id);
    const makeOfferObj = {
      // nonce: nonce.toString(),
      from: accountCtx.account,
      to: contractAddress,
      value: web3.utils.toHex(
        new BigNumber(offer).multipliedBy(10 ** 18).toString()
      ),
      data: makeOfferMethod,
    };
    const obj = {
      walletId: accountCtx.account,
      auctionId: auction.id,
      address: address,
      amount: new BigNumber(offer).multipliedBy(10 ** 18).toString(),
    };
    console.log("123123", obj);

    props.submitOffer(makeOfferObj, obj);
  };
  return (
    <div className={styles.info}>
      <div className={styles.infoWrapper}>
        <h4 className={styles.ProductName}>{auction?.name}</h4>
        <h5 className={styles.ProductBand}>
          {console.log("auction", auction)}
          Owner by{" "}
          <span
            class="link-info"
            onClick={() => {
              history.push(`/userCollection/${auction.owner}`);
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
          {console.log("price", Price)}
          <div className={styles.priceItem}>{Price}</div>
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
          {console.log()}
          {console.log(
            offer.length !== 0 &&
              parseFloat(offer) >
                new BigNumber(auction.highestBid).dividedBy(10 ** 18) &&
              accountCtx.account
          )}
          {offer.length !== 0 && address.length &&
          new BigNumber(auction.highestBid).dividedBy(10 ** 18) &&
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
        <div className={styles.searchBox1} >
            {console.log("offer", offer)}
            <input
              className={styles.searchTxt}
              type="text"
              name="productName_contains"
              placeholder="Address"
              autoComplete="off"
              onChange={handleAddressChange}
            />
          </div>
      </div>
    </div>
  );
}

export default ProductInfo;
