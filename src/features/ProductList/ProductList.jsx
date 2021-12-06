/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import queryString from "query-string";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "../../components/Pagination/Pagination";
import EachProduct from "./components/EachProduct/EachProduct";
import SlideBar from "./components/SlideBar/SlideBar";
import ProductSkeleton from "../../components/ProductSkeleton/ProductSkeleton";
const Productlist = () => {
  const history = useHistory();
  const { id } = useParams();
  const [auction, setAuction] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSekeleton, setLoadingSekeleton] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 12,
    totalRows: 11,
  });
  const [filters, setFilters] = useState({
    limit: 12,
    page: 1,
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    window.scrollTo(0, 0);
    const param = queryString.stringify(filters);
    console.log("param", param);
    const getAuctionAPI = `http://localhost:3002/auctions?${param}`;

    console.log("param", getAuctionAPI);
    setLoadingSekeleton(true);
    try {
      const res = await axios(getAuctionAPI);
      console.log(res);
      const data = res.data.data.auctions;
      console.log("filterdata", data);
      const { currentPage, limit, pageCount } = res.data;
      const total = limit * pageCount;
      setAuction(data);
      setPagination({ currentPage, limit, total });
      setLoadingSekeleton(false);
    } catch (error) {
      console.log(error);
      alert("Xảy ra lỗi");
    }
  }, [id, filters]);
  useEffect(async () => {
    try {
      const getAuctionAPI = `http://localhost:3002/categories`;

      const res = await axios(getAuctionAPI);
      console.log("category", res.data.data.category);
      setCategories(res.data.data.category);
    } catch (error) {
      console.log(error);
      alert("Xảy ra lỗi");
    }
  }, []);
  // useEffect(() => {
  //   setLoading(true);
  // }, []);
  // useEffect(() => {
  //   return setTimeout(() => {
  //     setLoading(false);
  //   }, 1500);
  // }, []);
  const handlePageChange = (newPage) => {
    const baseUrl = `/productList?limit=12&page=${newPage}`;
    console.log("newpage", newPage);
    console.log("newpage", history.location.pathname);
    setFilters({
      ...filters,
      page: newPage,
    });
    console.log("filter", filters);
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify({
        ...filters,
        page: newPage,
      }),
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
            <div className={styles.grid} class="container ">
              <div className={styles.grid_row} class="row">
                <div className={styles.col2} class="col-6 col-md-2">
                  <div
                    className={styles.category}
                    class="border border-2 p-3 rounded-3 mt-3"
                  >
                    <div
                      className={styles.categoryHeading}
                      class="text-primary"
                    >
                      Category
                    </div>
                    <div className={styles.categoryList}>
                      <div className={styles.categoryItem}>
                        <div className={styles.categoryItemLink}>
                          <span
                            onClick={() => {
                              const temp = {
                                ...filters,
                                categoryId: "ALL",
                              };
                              setFilters({
                                ...filters,
                                categoryId: "ALL",
                              });
                              history.push({
                                pathname: history.location.pathname,
                                search: queryString.stringify({
                                  ...temp,
                                }),
                              });
                            }}
                            class="text-secondary"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="ALL"
                          >
                            ALL
                          </span>
                        </div>
                        {categories.map((item) => (
                          <React.Fragment key={item.id}>
                            <div className={styles.categoryItemLink}>
                              <span
                                onClick={() => {
                                  const temp = {
                                    ...filters,
                                    categoriesId: item.id,
                                  };
                                  setFilters({
                                    ...filters,
                                    categoryId: item.id,
                                  });
                                  history.push({
                                    pathname: history.location.pathname,
                                    search: queryString.stringify({
                                      ...temp,
                                    }),
                                  });
                                }}
                                class="text-secondary"
                                data-toggle="tooltip"
                                data-placement="right"
                                title={item.name}
                              >
                                {item.name}
                              </span>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <div
                      className={styles.categoryHeading}
                      class="text-primary"
                    >
                      Status
                    </div>
                    <div className={styles.categoryList}>
                      <div className={styles.categoryItem}>
                        <div className={styles.categoryItemLink}>Price</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.grid__column10} class="col-md-10">
                  {loadingSekeleton ? (
                    <ProductSkeleton length={12} />
                  ) : (
                    <EachProduct auction={auction} link={URL} />
                  )}
                </div>
              </div>
            </div>
            <div class="mb-3 mt-5">
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Productlist;
