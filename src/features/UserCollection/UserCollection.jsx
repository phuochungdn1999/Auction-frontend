/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import styles from "./UserCollection.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import queryString from "query-string";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "../../components/Pagination/Pagination";
import Collection from "./components/Collection/Collection";
import Info from "./components/Info/Info";
import Filter from "./components/Filter/Filter";
const Productlist = () => {
  const history = useHistory();
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 12,
    totalRows: 11,
  });
  const [filters, setFilters] = useState({
    page_size: 12,
    page: 1,
  });
  const [auction, setAuction] = useState([]);
  const currentTime = Math.floor(new Date().getTime() / 1000);

  useEffect(async () => {
    window.scrollTo(0, 0);
    const param = queryString.stringify(filters);
    const getAuctionAPI = `http://localhost:3002/auctions/wallet/${id}`;

    try {
      console.log("getAuctionAPI", getAuctionAPI);
      const res = await axios(getAuctionAPI);
      console.log(res);
      const data = res.data.data.auctions.auctions;
      console.log("filterdata", data);

      setAuction(data);
    } catch (error) {
      console.log(error);
      alert("Xảy ra lỗi");
    }
  }, [id, filters]);
  useEffect(() => {
    setLoading(true);
  }, []);
  useEffect(() => {
    return setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  const handlePageChange = (newPage) => {
    console.log(newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
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
          <div className={styles.container}>
            <Info auction={auction}/>
            <div className={styles.grid}>
              <Filter />
              <div className={styles.grid_row}>
                <div className={styles.grid__column10}>
                  <Collection auction={auction} />
                </div>
              </div>
            </div>
            {/* <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            /> */}
          </div>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Productlist;
