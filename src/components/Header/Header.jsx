import React, { useState } from 'react';
import styles from './Header.module.css';
import { useHistory } from 'react-router';
import Search from '../Search/Search';
import Modal from './components/Modal/Modal';
const Header = () => {
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [acc, setAcc] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleAcc = () => {
    setAcc(!acc);
  };
  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.titles} onClick={() => history.push('/')}>
          <img
            src="	https://opensea.io/static/images/logos/opensea.svg"
            alt="img"
          />
          OpenSea
        </div>
        <Search />
        <div className={styles.info}>
          <div
            className={styles.acc}
            onClick={() => history.push('/productList')}
          >
            Explore
          </div>
          <div className={styles.cart} onClick={() => history.push('/create')}>
            Create
          </div>
          <div className={styles.his} onClick={() => history.push('/history')}>
            History
          </div>
          <div className={styles.img}>
            <img
              src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
              alt="img"
            />
          </div>

          {acc ? (
            <div onClick={toggleModal}> Xin chào</div>
          ) : (
            <div onClick={toggleAcc}> Connect to Wallet</div>
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
