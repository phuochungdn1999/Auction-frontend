import React from 'react';
import styles from './Info.module.css';
import Follow from './Components/Follow';
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
        <div className={styles.userName}>Desperate ApeWives</div>
        <div className={styles.hi}>
          Created by
          <span> DAWCompany</span>
        </div>
        <Follow auction={auction}/>
       
      </div>
    </div>
  );
};

export default Info;
