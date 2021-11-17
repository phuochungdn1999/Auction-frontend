import React, { useEffect, useState } from "react";
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
function ProductDetail(props) {
  const [product, setProduct] = useState({});
  const [auction, setAuction] = useState({});
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  useEffect(async () => {
    setSkeletonLoading(true);
    if (id) {
      const getApi = `http://localhost:3001/auctions/${id}`;
      console.log("api", getApi);
      const res = await axios.get(getApi);
      console.log(res.data);
      console.log(res.data.data.auction);
      console.log(res.data.data.image);
      setAuction(res.data.data.auction);
      setImages(res.data.data.image);
      setSkeletonLoading(false);
    }
  }, [id]);
  // useEffect(() => {
  //   setLoading(true);
  // }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1500);
  // }, []);
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
                    <ProductInfor auction={auction} />
                    <List auction={auction}/>
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
