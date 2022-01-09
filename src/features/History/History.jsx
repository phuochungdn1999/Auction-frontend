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
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(async () => {
    setLoading(true);
    if (accountCtx.account) {
      const getApi = `http://localhost:3002/offers/wallet/${accountCtx.account}`;
      const res = await axios.get(getApi);
      setHistory(res.data.data);
      console.log(res.data.data);
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
                    <div
                      className="cart-items"
                      class="m-5 border border-light rounded-3"
                    >
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
                        {/* <div className="cart-product-quantity"> */}
                        <div>
                          {handleStatus(item) == "END-WINNER" ||
                          handleStatus(item) == "END-WINNER" ? (
                            <div  class="text-success fw-bold">{handleStatus(item)}</div>
                          ) : (
                            <div class="text-secondary fw-bold">{handleStatus(item)}</div>
                          )}
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
