/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import "../History/history.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import PulseLoader from "react-spinners/PulseLoader";
import AccountContext from "../../Stores/StoreAddress";
import axios from "axios";
import BigNumber from "bignumber.js";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "../UserCollection/UserCollection.module.css";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("user");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [history, setHistory] = useState([]);

  const accountCtx = useContext(AccountContext);
  const currentTime = Math.floor(new Date().getTime() / 1000);

  const handleStatus = (item) => {
    let status = "";
    if (currentTime >= item.end || item.endAuction) {
      status += "END";
    } else {
      status += "LIVE";
    }
    if (
      String(item.addressHighest).toLocaleLowerCase() ==
      String(item.walletId).toLocaleLowerCase()
    ) {
      status += "-WINNER";
    } else {
      status += "-REFUNDED";
    }

    return status;
  };
  const handleSearch = async (event) => {
    const searchWord = event.target.value;
    setSearch(searchWord);
    console.log(search);
  };
  const handleFilter = async (event) => {
    const filterVal = event.target.value;
    setFilter(filterVal);
  };

  useEffect(async () => {
    setLoading(true);
    // if (accountCtx.account) {
    let getApi;
    if (filter == "user") {
      getApi = `http://localhost:3002/wallets?filter=ALL`;
      const res = await axios.get(getApi);
      setData(res.data.data);
      console.log("user", res.data);
    } else if (filter == "offer") {
      getApi = `http://localhost:3002/offers?filter=ALL`;
      const res = await axios.get(getApi);
      setData(res.data.data);
      console.log(res.data.data);
    } else if (filter == "auction") {
      getApi = `http://localhost:3002/auctions?filter=ALL`;
      const res = await axios.get(getApi);
      setData(res.data.data);
      console.log(res.data.data);
    }
    // }
    // else {
    //   setHistory([]);
    // }
    setLoading(false);
  }, [accountCtx.account, filter, search]);
  return (
    <React.Fragment>
      <Header />
      {loading ? (
        <div className="sweetLoading">
          <PulseLoader loading={loading} size={10} />
        </div>
      ) : (
        <React.Fragment>
          <div className="cart-container">
            <React.Fragment>
              {console.log("list history", history)}
              <div>
                <div>
                  <div className={styles.Filter}>
                    <div className={styles.searchBox}>
                      <input
                        className={styles.searchTxt}
                        type="text"
                        name="productName_contains"
                        placeholder="Type to search"
                        autoComplete="off"
                        onChange={handleSearch}
                      />
                      {console.log("search", search)}
                    </div>

                    <Box className={styles.listItem}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Filter
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Age"
                          defaultValue={"user"}
                          onChange={handleFilter}
                        >
                          <MenuItem value={"offer"}>Offer</MenuItem>
                          <MenuItem value={"user"}>User</MenuItem>
                          <MenuItem value={"aution"}>Auction</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    {console.log("filter", filter)}
                  </div>
                </div>
                <div>
                  <div className="titles">
                    <h3 className="product-title">WalletId</h3>
                    <h3 className="price">Auctions</h3>
                    <h3 className="status">Participants</h3>
                    <h3 className="total">Total Value</h3>
                    <h3 className="total">Created At</h3>
                  </div>
                  {data.map((item) => (
                    <Link 
                    // to={`/detail/${item.auctionId}`} key={item.id}
                    >
                      <div
                        className="cart-items"
                        class="m-5 border border-light rounded-3"
                      >
                        <div className="cart-item">
                          <div className="cart-product">
                            <div className="boxName">
                              <h3 className="itemName">{item.id}</h3>
                            </div>
                          </div>
                          <div className="cart-product">
                            <div className="boxName">
                              <h3 className="itemName">
                                {item.numberOfAuction}
                              </h3>
                            </div>
                          </div>
                          <div className="cart-product">
                            <div className="boxName">
                              <h3 className="itemName">
                                {item.numberOfParticipants}
                              </h3>
                            </div>
                          </div>
                          <div className="bocprice">
                            <div className="cart-product-price">
                              {new BigNumber(item.totalBid)
                                .dividedBy(10 ** 18)
                                .toFixed(4)
                                .toString()}{" "}
                            </div>
                            <img
                              src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                              alt="anh"
                              className="item-img"
                            />
                          </div>
                          <div className="cart-product-total-price">
                            {new Date(item.createdAt).toDateString()}
                          </div>
                        </div>
                      </div>
                     </Link>
                  ))}
                </div>
              </div>
            </React.Fragment>
          </div>
        </React.Fragment>
      )}
      <Footer />
    </React.Fragment>
  );
};

export default Admin;
