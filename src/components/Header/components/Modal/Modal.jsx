import React from 'react';
import styles from '../../Header.module.css';
import ButtonWrapper from './ButtonWrapper/ButtonWrapper';
import Row1 from './Row1/Row1';
import Row2 from './Row2/Row2';
const Modal = () => {
  return (
    <div>
      <div className={styles.modalContent}>
        <div className={styles.profile}>
          <img
            src="https://lh3.googleusercontent.com/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE=s100"
            alt="ava"
          />
          <p> luong le</p>
          <div className={styles.token}>0x6613321be123321</div>
          <Row1 />
          <Row2 />
          <ButtonWrapper />
        </div>
        <button className={styles.closeModal}>
          <i class="far fa-times-circle"></i>
        </button>
      </div>
    </div>
  );
};

export default Modal;
