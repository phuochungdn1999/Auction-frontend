import React from "react";
import styles from "./Info.module.css";
import Follow from "./Components/Follow";
import web3 from "web3";
const Info = (props) => {
  const { auction } = props;
  return (
    <div className={styles.divWrapper}>
      <div className={styles.Banner}>
        <div className={styles.imgWrapper}>
          <img
            src="https://lh3.googleusercontent.com/J2IjlrMBrPD9Py1ZMUi9-WO3lWLW-Mt3FGwkLC_kE5DwedLR4GTiDuL4s6glnd-Fa7vEvOAPLEg1CFbmPqlBcdKuVzCNyC-GpBPS7g=h600"
            alt="background"
          />
        </div>
      </div>
      <div className={styles.userInfo}>
        <img
          src="https://lh3.googleusercontent.com/6yDCMzPIcptR38LjsP-QyMvan-6rO8RSy_tHtwzXVpppTEuFXbgxTIjt5TzlP94Ql30bUeStPSrJQx0Ca1xd48K5PCiK3v-CvFLsBg=s130"
          alt="ava"
        />
        <div className={styles.userName} class="fs-4 text-secondary mb-3">{web3.utils.toChecksumAddress(props.id)}</div>

        <Follow auction={auction} />
      </div>
    </div>
  );
};

export default Info;
