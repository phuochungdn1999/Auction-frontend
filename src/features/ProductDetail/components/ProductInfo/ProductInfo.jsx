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

  const { auction, userOffer } = props;
  // const salePrice = (product.sale_price * product.discount) / 100;
  const Price = new BigNumber(auction.highestBid)
    .dividedBy(10 ** 18)
    .toString();

  const [offer, setOffer] = useState("");
  const [address, setAddress] = useState(props.userOffer?.address);
  const [addressOutput, setAddressOutput] = useState(props.userOffer?.address);
  const [isOwner, setIsOwner] = useState(false);
  const currentTime = Math.floor(new Date().getTime() / 1000);

  const handleOfferChange = (event) => {
    setOffer(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    setAddressOutput(event.target.value);
  };

  const validateOwner = () => {
    return auction.owner == String(accountCtx.account).toLocaleLowerCase();
  };
  const validateEndTime = () => {
    return auction.endAuction || auction.end < currentTime;
  };
  const validateWinner = () => {
    console.log();
    return (
      auction.addressHighest == String(accountCtx.account).toLocaleLowerCase()
    );
  };
  const validateOwnerEnd = () => {
    return auction.endAuction || auction.end < currentTime;
  };
  const validateAuctionJoined = () => {
    return auction.addressHighest ? true : false;
  };
  const validateAuctionEndApprove = () => {
    return !(auction.endAuction || auction.end < currentTime);
  };
  const validateOwnerSent = () => {
    return (
      (auction.endAuction || auction.end < currentTime) && auction.onwerApproved
    );
  };
  const validateUserReceive = () => {
    return (
      (auction.endAuction || auction.end < currentTime) && auction.buyerApprove
    );
  };

  const handleSubmit = async () => {
    const web3 = new Web3(accountCtx.rpc);
    const contractAddress = "0xB0b03b0a469f3A60F92C09504AdA25D832D8e06e";
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
  const handleApprove = async () => {
    const web3 = new Web3(accountCtx.rpc);
    const contractAddress = "0xB0b03b0a469f3A60F92C09504AdA25D832D8e06e";
    const contractERC721 = new web3.eth.Contract(auctionAbi, contractAddress);
    console.log(auction.id);
    const approveMethods = contractERC721.methods
      .approveWinner(auction.id)
      .encodeABI();
    const approveObj = {
      // nonce: nonce.toString(),
      from: accountCtx.account,
      to: contractAddress,
      value: web3.utils.toHex(0),
      data: approveMethods,
    };
    console.log("approveObj", approveObj);
    props.submitWinner(approveObj);
  };

  const handleConfirmSend = async () => {
    const web3 = new Web3(accountCtx.rpc);
    const contractAddress = "0xB0b03b0a469f3A60F92C09504AdA25D832D8e06e";
    const contractERC721 = new web3.eth.Contract(auctionAbi, contractAddress);
    console.log("id", auction.id);
    const ownerConfirmMethod = contractERC721.methods
      .ownerConfirmSend(auction.id)
      .encodeABI();
    console.log(
      "number",
      new BigNumber(offer).multipliedBy(10 ** 18).toString()
    );
    console.log("number", auction.id);
    const makeOfferObj = {
      from: accountCtx.account,
      to: contractAddress,
      value: web3.utils.toHex(0),
      data: ownerConfirmMethod,
    };

    props.confirmSend(makeOfferObj);
  };

  const handleConfirmReceive = async () => {
    const web3 = new Web3(accountCtx.rpc);
    const contractAddress = "0xB0b03b0a469f3A60F92C09504AdA25D832D8e06e";
    const contractERC721 = new web3.eth.Contract(auctionAbi, contractAddress);
    console.log(auction.id);
    const approveMethods = contractERC721.methods
      .userConfirmReceive(auction.id)
      .encodeABI();
    const approveObj = {
      from: accountCtx.account,
      to: contractAddress,
      value: web3.utils.toHex(0),
      data: approveMethods,
    };
    console.log("approveObj", approveObj);
    props.confirmReceive(approveObj);
  };

  return (
    <div className={styles.info}>
      {console.log("auctionifof", validateOwner())}
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
      {validateEndTime() ? (
        validateWinner() ? (
          <div className={styles.ProductCartWapper}>
            <div className={styles.containBtn1}>
              <h5 className={styles.ProductBand}>
                {console.log("auction", auction)}
                <p>
                  YOU ARE WINNER OF THIS AUCTION{" "}
                  <span
                    class="link-info"
                    onClick={() => {
                      history.push(`/userCollection/${auction.owner}`);
                    }}
                  >
                    {auction.addressHighest}
                  </span>{" "}
                </p>
              </h5>
            </div>
            <button
              type="button"
              class="btn btn-primary btn-lg"
              onClick={handleConfirmReceive}
              disabled={validateUserReceive ? "true" : "false"}
            >
              CONFIRMED RECEIVE PRODUCT
            </button>
          </div>
        ) : validateOwner() ? (
          <div className={styles.ProductCartWapper}>
            <div className={styles.containBtn1}>
              <h5 className={styles.ProductBand}>
                {console.log("auction", auction)}
                <p>
                  WINNER OF THIS AUCTION{" "}
                  <span
                    class="link-info"
                    onClick={() => {
                      history.push(`/userCollection/${auction.owner}`);
                    }}
                  >
                    {auction.addressHighest}
                  </span>{" "}
                </p>
              </h5>
            </div>
            {console.log("validateOwnerSent", validateOwnerSent())}
            <button
              type="button"
              class="btn btn-primary btn-lg"
              onClick={handleConfirmSend}
              disabled={validateOwnerSent ? "true" : "false"}
            >
              CONFIRMED SENT PRODUCT
            </button>
          </div>
        ) : (
          <div className={styles.ProductCartWapper}>
            <div className={styles.containBtn1}>
              <h5 className={styles.ProductBand}>
                {console.log("auction", auction)}
                <p>
                  WINNER OF THIS AUCTION{" "}
                  <span
                    class="link-info"
                    onClick={() => {
                      history.push(`/userCollection/${auction.owner}`);
                    }}
                  >
                    {auction.addressHighest}
                  </span>{" "}
                </p>
              </h5>
            </div>
          </div>
        )
      ) : validateOwner() ? (
        <div className={styles.ProductCartWapper}>
          <div className={styles.containBtn1}>
            <h5 className={styles.ProductBand}>
              {console.log("auction", auction)}
              Current Winner{" "}
              <span
                class="link-info"
                onClick={() => {
                  history.push(`/userCollection/${auction.owner}`);
                }}
              >
                {auction.addressHighest}
              </span>{" "}
            </h5>
          </div>

          {/* <button className={styles.button} onClick={handleSubmit}>
                APPROVE THIS ACCOUNT WIN
              </button> */}
          {validateAuctionJoined() && validateAuctionEndApprove() ? (
            <button
              type="button"
              class="btn btn-primary btn-lg"
              onClick={handleApprove}
            >
              APPROVE THIS ACCOUNT WIN
            </button>
          ) : (
            <button
              type="button"
              class="btn btn-primary btn-lg"
              disabled="true"
            >
              APPROVE THIS ACCOUNT WIN
            </button>
          )}
        </div>
      ) : (
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
            {offer.length !== 0 &&
            address.length &&
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
          <div className={styles.searchBox1}>
            {console.log("offer", offer)}
            <input
              className={styles.searchTxt}
              type="text"
              name="productName_contains"
              placeholder={"Address"}
              value={addressOutput}
              autoComplete="off"
              onChange={handleAddressChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
