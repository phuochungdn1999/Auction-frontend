/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import "./history.css";
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
  const [user, setUser] = useState([]);
  const [auction, setAuction] = useState([]);
  const [offer, setOffer] = useState([]);
  const [user1, setUser1] = useState([]);
  const [auction1, setAuction1] = useState([]);
  const [offer1, setOffer1] = useState([]);

  const accountCtx = useContext(AccountContext);
  const currentTime = Math.floor(new Date().getTime() / 1000);

  const handleStatus = (item) => {
    let status = "";
    if (currentTime >= item.end || item.endAuction) {
      status += "END";
    } else if (currentTime < item.start) {
      status += "INCOMING";
    } else {
      status += "LIVE";
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
    console.log("filterVal", filterVal);
    setFilter(filterVal);
  };

  useEffect(async () => {
    setLoading(true);
    // if (accountCtx.account) {
    let getApi;
    getApi = `http://localhost:3002/wallets?filter=ALL`;
    const res = await axios.get(getApi);
    setUser(res.data.data);
    setUser1(res.data.data);
    console.log("user", res.data);
    getApi = `http://localhost:3002/offers?filter=ALL`;
    const res1 = await axios.get(getApi);
    setOffer(res1.data.data.offers);
    setOffer1(res1.data.data.offers);
    console.log(res.data.data);
    getApi = `http://localhost:3002/auctions?filter=ALL`;
    const res2 = await axios.get(getApi);
    setAuction(res2.data.data.auctions);
    setAuction1(res2.data.data.auctions);
    console.log(res.data.data);

    // }
    // else {
    //   setHistory([]);
    // }
    setLoading(false);
  }, [accountCtx.account]);

  useEffect(async () => {
    setLoading(true);

    if (filter == "user") {
      if (search.length != 0) {
        const temp = user.filter((item) =>
          String(item.id).includes(search.toLocaleLowerCase())
        );
        setUser1(temp);
      } else {
        setUser1(user);
      }
    } else if (filter == "auction") {
      if (search.length != 0) {
        const temp = auction.filter(
          (item) =>
            String(item.name.toLocaleLowerCase()).includes(
              search.toLocaleLowerCase()
            ) ||
            String(item.id).includes(search.toLocaleLowerCase()) ||
            String(item.owner.toLocaleLowerCase()).includes(
              search.toLocaleLowerCase()
            )
        );
        setAuction1(temp);
      } else {
        setAuction1(auction);
      }
    } else {
      if (search.length != 0) {
        const temp = offer.filter(
          (item) =>
            String(item.walletId).includes(search.toLocaleLowerCase()) ||
            String(item.address.toLowerCase()).includes(
              search.toLocaleLowerCase()
            ) ||
            String(item.id).includes(search.toLocaleLowerCase())
        );
        setOffer1(temp);
      } else {
        setOffer1(offer);
      }
    }

    setLoading(false);
  }, [search, filter]);

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
                          onChange={handleFilter}
                          value={filter}
                        >
                          <MenuItem value={"offer"}>Offer</MenuItem>
                          <MenuItem value={"user"}>User</MenuItem>
                          <MenuItem value={"auction"}>Auction</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    {console.log("filter", filter)}
                  </div>
                </div>

                {filter == "user" ? (
                  <table class="mt-5 table table-striped">
                    <thead class="p-3">
                      <tr class="p-3">
                        <th scope="col">ID</th>
                        <th scope="col">AUCTIONS</th>
                        <th scope="col">PARTICIPANTS</th>
                        <th scope="col">TOTAL VALUE</th>
                        <th scope="col">CREATED AT</th>
                      </tr>
                    </thead>
                    <tbody class="p-3">
                      {user1.map((item) => (
                        <tr class="p-3">
                          <th scope="row">
                            <Link to={`/userCollection/${item.id}`}>
                              {item.id}
                            </Link>
                          </th>
                          <td class="fw-bolder">{item.numberOfAuction}</td>
                          <td class="fw-bolder">{item.numberOfParticipants}</td>
                          <td class="fw-bolder">
                            {new BigNumber(item.totalBid)
                              .dividedBy(10 ** 18)
                              .toFixed(4)
                              .toString()}{" "}
                            <img
                              src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                              alt="anh"
                              className="item-img"
                            />
                          </td>
                          <td class="fw-bolder">
                            {new Date(item.createdAt).toDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : filter == "auction" ? (
                  <table class="mt-5 table table-striped">
                    <thead class="p-3">
                      <tr class="p-3">
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col">OWNER</th>
                        <th scope="col">PARTICIPANTS</th>
                        <th scope="col">HIGHEST BID</th>
                        <th scope="col">STATUS</th>
                      </tr>
                    </thead>
                    <tbody class="p-3">
                      {auction1.map((item) => (
                        <tr class="p-3">
                          <th scope="row">
                            <Link to={`/detail/${item.id}`}>{item.id}</Link>
                          </th>
                          <td class="fw-bolder">
                            <Link to={`/detail/${item.id}`}>{item.name}</Link>
                          </td>
                          <td class="fw-bolder">
                            <Link to={`/userCollection/${item.owner}`}>
                              0x{item.owner[2]}
                              {item.owner[3]}
                              {item.owner[4]}...{item.owner[39]}
                              {item.owner[40]}
                              {item.owner[41]}
                            </Link>
                          </td>
                          <td class="fw-bolder">{item.numberOfParticipants}</td>
                          <td class="fw-bolder">
                            {new BigNumber(item.highestBid)
                              .dividedBy(10 ** 18)
                              .toFixed(4)
                              .toString()}
                            <img
                              src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                              alt="anh"
                              className="item-img"
                            />
                          </td>
                          <td class="fw-bolder">{handleStatus(item)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table class="mt-5 table table-striped">
                    <thead class="p-3">
                      <tr class="p-3">
                        <th scope="col">ID</th>
                        <th scope="col">AUCTION ID</th>
                        <th scope="col">WALLET</th>
                        <th scope="col">VAULE</th>
                        <th scope="col">ADDRESS</th>
                        <th scope="col">UPDATED AT</th>
                      </tr>
                    </thead>
                    <tbody class="p-3">
                      {offer1.map((item) => (
                        <tr class="p-3">
                          <th scope="row">{item.id}</th>
                          <td class="fw-bolder">
                            <Link to={`/detail/${item.auctionId}`}>
                              {item.auctionId}
                            </Link>
                          </td>
                          <td class="fw-bolder">
                            <Link to={`/userCollection/${item.walletId}`}>
                              0x{item.walletId[2]}
                              {item.walletId[3]}
                              {item.walletId[4]}...{item.walletId[39]}
                              {item.walletId[40]}
                              {item.walletId[41]}
                            </Link>
                          </td>
                          <td class="fw-bolder">
                            {new BigNumber(item.amount)
                              .dividedBy(10 ** 18)
                              .toFixed(4)
                              .toString()}
                            <img
                              src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                              alt="anh"
                              className="item-img"
                            />
                          </td>
                          <td class="fw-bolder">{item.address}</td>
                          <td class="fw-bolder">
                            {new Date(item.updatedAt).toDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
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
