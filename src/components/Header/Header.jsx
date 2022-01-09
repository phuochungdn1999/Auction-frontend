/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import styles from "./Header.module.css";
import { useHistory } from "react-router";
import Search from "../Search/Search";
import Modal from "./components/Modal/Modal";
import { injected } from "../Wallet/Connector";
import { useWeb3React } from "@web3-react/core";
import AccountContext from "../../Stores/StoreAddress";
import { useMoralis } from "react-moralis";

const Header = () => {
  const accountCtx = useContext(AccountContext);
  const { authenticate, isAuthenticated, user } = useMoralis();

  const history = useHistory();
  const [modal, setModal] = useState(false);
  const {
    active,
    account,
    library,
    connector,
    activate,
    deactivate,
    chainId,
    error,
  } = useWeb3React();
  const toggleModal = () => {
    setModal(!modal);
  };

  const shortenAddress = (address) => {
    return (
      address[0] +
      address[1] +
      address[2] +
      address[3] +
      address[4] +
      address[5] +
      address[6] +
      address[7] +
      address[8] +
      "..." +
      address[34] +
      address[35] +
      address[36] +
      address[37] +
      address[39] +
      address[39] +
      address[40] +
      address[41]
    );
  };

  useEffect(async () => {
    console.log("899999")
    console.log(account);
    console.log(chainId);
    if (account !== undefined && (chainId== 4 || chainId == 1  || chainId == 80001)) {
      console.log("chainId",chainId)
      const info = {
        id: String(account),
        networkId: String(chainId),
      };
      console.log(info);
      const data = await fetch("http://localhost:3002/wallets", {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      console.log(response);
      accountCtx.addNewAccount(response.data.id);
      accountCtx.addNewChainId(chainId);
      accountCtx.addNewToken(response.token);
      if (chainId === 4) {
        accountCtx.addNewRpc(
          "https://speedy-nodes-nyc.moralis.io/eab63686b28a1d9bdec08dc7/eth/rinkeby"
        );
      } else {
        accountCtx.addNewRpc(
          "https://speedy-nodes-nyc.moralis.io/eab63686b28a1d9bdec08dc7/eth/mainnet"
        );
      }
      console.log(response.token);
    }
  }, [active, account, chainId, isAuthenticated]);

  async function connect() {
    try {
      console.log("123123");
      // authenticate();
      console.log(injected)
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.titles} onClick={() => history.push("/")}>
          <img
            src="	https://opensea.io/static/images/logos/opensea.svg"
            alt="img"
          />
          AUCTIONCHAIN
        </div>
        <div className={styles.search}>
          <Search />
        </div>
        <div className={styles.info}>
          <div
            className={styles.acc}
            onClick={() => history.push("/productList")}
          >
            Explore
          </div>
          <div className={styles.cart} onClick={() => history.push("/create")}>
            Create
          </div>
          <div className={styles.his} onClick={() => history.push("/history")}>
            History
          </div>
          <div className={styles.img}>
            <img
              src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
              alt="img"
            />
          </div>

          {!active ? (
            <div>
              <button
                className="btn btn-outline-secondary rounded-pill"
                onClick={async () => await connect()}
              >
                Connect to MetaMask
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={toggleModal}
                className="btn btn-outline-secondary  rounded-pill  "
              >
                {shortenAddress(account)}
              </button>
            </div>
          )}
        </div>
      </div>
      {modal && (
        <div className={styles.modal}>
          <div onClick={toggleModal} className={styles.overLay}>
            <Modal />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Header;
