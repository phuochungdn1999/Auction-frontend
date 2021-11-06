import React from 'react';
import styles from './Slider.module.css';
import { useHistory } from 'react-router';
const Slider = () => {
  const history = useHistory();
  return (
    <div className={styles.slider}>
      <div className={styles.sliderImg}>
        <div className={styles.modal}>
          <div className={styles.infoLeft}>
            <div className={styles.headerName}>
              Discover, collect, and sell extraordinary NFTs
            </div>
            <div className={styles.titleName}>
              on the world's first & largest NFT marketplace
            </div>
            <div className={styles.button}>
              <button
                className={styles.btn1}
                onClick={() => history.push('/productList')}
              >
                Explore
              </button>
              <button
                className={styles.btn2}
                onClick={() => history.push('/create')}
              >
                Create
              </button>
            </div>
          </div>
          <div className={styles.infoRight}>
            <div className={styles.containRight}>
              <img
                src="https://lh3.googleusercontent.com/0JXkHjphS_WAP5o6utg-HAZ4YRf0Kb1FzYlgjOCYZURxt8bdC1Yfa7jFMw9cbc1wje3zdTpVs4k8erdzmLXuu5y4RqQ50nyLAS2HwQ=s550"
                alt="img"
              />
              <div className={styles.detailInfo}>
                <img
                  src="https://lh3.googleusercontent.com/KHBbc4JDx8r1F6gOmq_MiwsXTEVCaFa2fZtGesQZ6nrR583uY2dlBccXyBkXPNnzdGVIoYpBM7__UmLyRWbhHQK5YOTVu9eXijhd1w=s80"
                  alt="ava"
                />
                <div className={styles.detailHeader}>
                  <div className={styles.detailTilte}>
                    Becca Notices that all the Cool Kids are Buying Sneakers
                    Again
                  </div>
                  <div className={styles.subTitle}> Nordstrum</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
