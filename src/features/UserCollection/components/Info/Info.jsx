import React from 'react';
import styles from './Info.module.css';
import Follow from './Components/Follow';
const Info = () => {
  // const { auction } = props;
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
        <Follow auction/>
        <div className={styles.Description}>
          Inspired by the award winning television series “The Desperate
          Housewives”, DAW is a collection of 10,000 Desperate ApeWives NFTs.
          With signature red lips each Ape Wife is not only an awesome fine art
          JPEG, it’s also an exclusive DAW membership card that allows access to
          members-only benefits which will be revealed over time. Each Desperate
          Ape Wife is unique and algorithmically generated from over 218 traits.
          All apewives are hot but some are supermodels is our tagline. As part
          of our roadmap development, our vision is to bridge the NFT space with
          the physical world, one of the many pros is that ownership and
          commercial usage rights are given to the owner, over their NFT.
        </div>
      </div>
    </div>
  );
};

export default Info;
