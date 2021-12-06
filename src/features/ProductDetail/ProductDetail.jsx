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
  const [product, setProduct] = useState({});
  const [auction, setAuction] = useState({});
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const accountCtx = useContext(AccountContext);

  useEffect(async () => {
    setSkeletonLoading(true);
    if (id) {
      const getApi = `http://localhost:3002/auctions/${id}`;
      console.log("api", getApi);
      const res = await axios.get(getApi);
      console.log(res.data);
      console.log(res.data.data.auction);
      console.log(res.data.data.image);
      setAuction(res.data.data.auction);
      setImages(res.data.data.image);
      setSkeletonLoading(false);
    }
  }, [id, isReload]);
  // useEffect(() => {
  //   setLoading(true);
  // }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1500);
  // }, []);
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
            <div className={styles.grid__row}>
              <div className={styles.row}>
                {skeletonLoading ? (
                  <InfoSekeleton />
                ) : (
                  <div className={styles.grid__column5}>
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
                  <div className={styles.grid__column52}>
                    <ProductInfor auction={auction} submitOffer={submitOffer} />
                    <List auction={auction} />
                  </div>
                )}
              </div>
              {skeletonLoading ? (
                <DetailsSekeleton />
              ) : (
                <div className={styles.row}>
                  <Description auction={auction} />
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
