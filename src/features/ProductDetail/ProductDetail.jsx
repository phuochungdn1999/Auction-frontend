/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import ProductInfor from "./components/ProductInfo/ProductInfo";
import List from "./components/List/List";
import ProductRelated from "./components/ProductRelated/ProductRelated";
import styles from "./ProductDetail.module.css";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useParams } from "react-router";
import Footer from "../../components/Footer/Footer";
import ClipLoader from "react-spinners/ClipLoader";
import Description from "./components/Description/Description";
import DetailsSekeleton from "../../components/ProductSkeleton/DetailsSekeleton";
import InfoSekeleton from "../../components/ProductSkeleton/InfoSekeleton";
import BigNumber from "bignumber.js";
import AccountContext from "../../Stores/StoreAddress";

const Web3 = require("web3");
const auctionAbi = require("../../abi/auction.json");

function ProductDetail(props) {
  const [auction, setAuction] = useState({});
  // const [auction, setAuction] = useState({});
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [userOffer, setUserOffer] = useState({});
  const accountCtx = useContext(AccountContext);


  useEffect(async () => {
    window.scrollTo(0, 0);
    setSkeletonLoading(true);
    if (id) {
      const token = accountCtx.token;
      const getApi = `http://localhost:3002/auctions/${id}`;
      console.log("api", getApi);
      const res = await axios.get(getApi);
      // console.log(res.data);
      // console.log(res.data.data.auction);
      // console.log(res.data.data.image);
      setAuction(res.data.data.auction);
      setImages(res.data.data.image);
      console.log("token ", token);
      if (token) {
        const headers = {
          Authorization: `Bearer ${accountCtx.token}`,
        };
        console.log(headers);
        const offer = await axios.get(
          `http://localhost:3002/offers/wallet/auction/${res.data.data.auction.id}`,
          {
            headers: headers,
          }
        );
        console.log("offer123123123", offer);
        // setOffer(offer.)
        console.log("data", offer.data.data);
        offer.data.data ? setUserOffer(offer.data.data): setUserOffer(null);
      }
      setSkeletonLoading(false);
    }
  }, [id, isReload, accountCtx]);
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const submitOffer = async (makeOfferObj, obj) => {
    const web3 = new Web3(accountCtx.rpc);
    const contractAddress = "0xEb7073f2cc0D6fa8B3d4bef01467B0dd5Cc2b791";
    const contractERC721 = new web3.eth.Contract(auctionAbi, contractAddress);
    console.log("method", makeOfferObj);
    console.log("method", obj);
    try {
      console.log("Open metamask");
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [makeOfferObj],
      });

      console.log({ txHash });

      let transactionReceipt = null;
      while (transactionReceipt == null) {
        // Waiting expectedBlockTime until the transaction is mined
        transactionReceipt = await web3.eth.getTransactionReceipt(txHash);
        await sleep(5000);
      }
      // contract = transactionReceipt.contractAddress;
      console.log("Got the transaction receipt: ", transactionReceipt);
      console.log(obj);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accountCtx.token}`,
      };
      console.log(headers);
      const data = await axios.post("http://localhost:3002/offers", obj, {
        headers: headers,
      });
      console.log("data", data);
    } catch (error) {
      console.log("reject", error);
    }

    setIsReload(!isReload);
  };

  const submitWinner = async (approveObj, obj) => {
    const web3 = new Web3(accountCtx.rpc);
    const contractAddress = "0xEb7073f2cc0D6fa8B3d4bef01467B0dd5Cc2b791";
    const contractERC721 = new web3.eth.Contract(auctionAbi, contractAddress);
    console.log("method", approveObj);
    console.log("method", obj);
    try {
      console.log("Open metamask");
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [approveObj],
      });

      console.log({ txHash });

      let transactionReceipt = null;
      while (transactionReceipt == null) {
        // Waiting expectedBlockTime until the transaction is mined
        transactionReceipt = await web3.eth.getTransactionReceipt(txHash);
        await sleep(5000);
      }
      // contract = transactionReceipt.contractAddress;
      console.log("Got the transaction receipt: ", transactionReceipt);
      console.log(obj);
      console.log("apprive winner");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accountCtx.token}`,
      };
      const data = await fetch(
        `http://localhost:3002/auctions/approve/${auction.id}`,
        {
          method: "POST",
          headers: headers,
          // body: JSON.stringify(obj),
        }
      );
      console.log("data-------------------------", data);
    } catch (error) {
      console.log("reject", error);
    }

    setIsReload(!isReload);
  };

  const confirmSend = async (approveObj, obj) => {
    const web3 = new Web3(accountCtx.rpc);
    const contractAddress = "0xEb7073f2cc0D6fa8B3d4bef01467B0dd5Cc2b791";
    const contractERC721 = new web3.eth.Contract(auctionAbi, contractAddress);
    console.log("method", approveObj);
    console.log("method", obj);
    try {
      console.log("Open metamask");
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [approveObj],
      });

      console.log({ txHash });

      let transactionReceipt = null;
      while (transactionReceipt == null) {
        // Waiting expectedBlockTime until the transaction is mined
        transactionReceipt = await web3.eth.getTransactionReceipt(txHash);
        await sleep(5000);
      }
      // contract = transactionReceipt.contractAddress;
      console.log("Got the transaction receipt: ", transactionReceipt);
      console.log(obj);
      console.log("apprive winner");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accountCtx.token}`,
      };
      console.log("receive 1231231231231231231")
      const data = await fetch(
        `http://localhost:3002/auctions/send/${auction.id}`,
        {
          method: "POST",
          headers: headers,
          // body: JSON.stringify(obj),
        }
      );
      console.log("data", data);
    } catch (error) {
      console.log("reject", error);
    }

    setIsReload(!isReload);
  };
  const confirmReceive = async (approveObj, obj) => {
    const web3 = new Web3(accountCtx.rpc);
    const contractAddress = "0xEb7073f2cc0D6fa8B3d4bef01467B0dd5Cc2b791";
    const contractERC721 = new web3.eth.Contract(auctionAbi, contractAddress);
    console.log("method", approveObj);
    console.log("method", obj);
    try {
      console.log("Open metamask");
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [approveObj],
      });

      console.log({ txHash });

      let transactionReceipt = null;
      while (transactionReceipt == null) {
        // Waiting expectedBlockTime until the transaction is mined
        transactionReceipt = await web3.eth.getTransactionReceipt(txHash);
        await sleep(5000);
      }
      // contract = transactionReceipt.contractAddress;
      console.log("Got the transaction receipt: ", transactionReceipt);
      console.log(obj);
      console.log("apprive winner");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accountCtx.token}`,
      };
      console.log("receive 4564564")
      const data = await fetch(
        `http://localhost:3002/auctions/receive/${auction.id}`,
        {
          method: "POST",
          headers: headers,
          // body: JSON.stringify(obj),
        }
      );
      console.log("data", data);
    } catch (error) {
      console.log("reject", error);
    }

    setIsReload(!isReload);
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className={styles.sweetLoading}>
          <ClipLoader loading={loading} size={50} />
        </div>
      ) : (
        <React.Fragment>
          <Header />

          <div className={styles.container_productDetails}>
            <div class="container-fluid m-5">
              <div class="m-5">
                <div class="row">
                  {skeletonLoading ? (
                    <InfoSekeleton />
                  ) : (
                    <div className={styles.grid__column5} class="col">
                      {console.log("thum", auction.imageLogo)}
                      <img
                        src={auction.imageLogo}
                        alt="anhr"
                        className={styles.product_img}
                      />
                      {/* <div className={styles.listImg}>
                      {images?.slice(0, 5)?.map((item) => (
                        <img
                          key={item.id}
                          className={styles.imgDetails}
                          src={item.url}
                          alt="img"
                        />
                      ))}
                    </div> */}
                    </div>
                  )}
                  {skeletonLoading ? (
                    <DetailsSekeleton />
                  ) : (
                    <div className={styles.grid__column52} class="col">
                      <ProductInfor
                        auction={auction}
                        submitOffer={submitOffer}
                        submitWinner={submitWinner}
                        confirmReceive={confirmReceive}
                        confirmSend={confirmSend}
                        userOffer={userOffer}
                      />
                      <List auction={auction} />
                    </div>
                  )}
                </div>
              </div>
              {skeletonLoading ? (
                <DetailsSekeleton />
              ) : (
                <div
                  className={styles.row}
                  class="m-5 border border-light border-3 rounded-3"
                >
                  <Description class="m-5" auction={auction} />
                </div>
              )}
              <div className={styles.RelatedWapper}>
                <ProductRelated />
              </div>
            </div>
          </div>

          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
    // a cmt heest lai di roi goi cung dc
    // em dat cai decription o dau
  );
}

export default ProductDetail;
