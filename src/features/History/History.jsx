import React, { useEffect, useState, useContext } from "react";
import "./history.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import PulseLoader from "react-spinners/PulseLoader";
import AccountContext from "../../Stores/StoreAddress";
import axios from "axios";
import BigNumber from "bignumber.js";
import { Link } from "react-router-dom";

const History = () => {
  const listHistory = [
    {
      image:
        "https://lh3.googleusercontent.com/k6LaoZTSi68Atu1eCjTliBR_dCejX--wxPDywbrn7QdVWYHvPIUtZ1-0Ia7qE30RzugvKPPlLUYuv8w_6HFl",
      name: "CryptoPunk",
      price: "123123",
      num: "123123",
    },
    {
      image:
        "https://lh3.googleusercontent.com/k6LaoZTSi68Atu1eCjTliBR_dCejX--wxPDywbrn7QdVWYHvPIUtZ1-0Ia7qE30RzugvKPPlLUYuv8w_6HFl",
      name: "CryptoPunk",
      price: "123123",
      num: "123123",
    },
  ];
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const accountCtx = useContext(AccountContext);

  useEffect(async () => {
    setLoading(true);
    if (accountCtx.account) {
      const getApi = `http://localhost:3001/offers/wallet/${accountCtx.account}`;
      const res = await axios.get(getApi);
      setHistory(res.data.data);
    } else {
      setHistory([]);
    }
    setLoading(false);
  }, [accountCtx.account]);
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
                <div className="titles">
                  <h3 className="product-title">Item</h3>
                  <h3 className="price">Price</h3>
                  <h3 className="status">Status</h3>
                  <h3 className="total">Time</h3>
                </div>
                {history.map((item) => (
                  <Link to={`/detail/${item.auctionId}`} key={item.id}>
                    <div className="cart-items">
                      <div className="cart-item">
                        <div className="cart-product">
                          <img src={item.imageLogo} alt="anh" />
                          <div className="boxName">
                            <h3 className="itemName">{item.name}</h3>
                          </div>
                        </div>
                        <div className="bocprice">
                          <div className="cart-product-price">
                            {new BigNumber(item.amount)
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
                        <div className="cart-product-quantity">
                          <div className="count">Sell</div>
                        </div>
                        <div className="cart-product-total-price">
                          {new Date(item.updatedAt).toDateString()}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </React.Fragment>
          </div>
        </React.Fragment>
      )}
      <Footer />
    </React.Fragment>
  );
};

export default History;
