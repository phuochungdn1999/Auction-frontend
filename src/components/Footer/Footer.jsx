import React from 'react';
import styles from './Footer.module.css';
function Footer(props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.grid__row}>
          <div className={styles.grid__column24}>
            <h3 className={styles.footer__heading}>Auticon</h3>
            <ul className={styles.footer__list}>
              <li className={styles.footer__items}>
                <i className="fas fa-map-marker-alt"></i>
                <div className={styles.footer__link}>
                  54 Nguyen Luong Bang, Lien Chieu, Da Nang
                </div>
              </li>
              <li className={styles.footer__items}>
                <i className="fas fa-phone-alt"></i>
                <div className={styles.footer__link}>1900 6555</div>
              </li>
              <li className={styles.footer__items}>
                <i className="fas fa-envelope"></i>
                <div className={styles.footer__link}>hungnguyen@gmail.com</div>
              </li>
            </ul>
          </div>
          <div className={styles.grid__column24}>
            <h3 className={styles.footer__heading}>Giới thiệu</h3>
            <ul className={styles.footer__list}>
              <li className={styles.footer__items}>
                <div className={styles.footer__link}>Giới thiệu</div>
              </li>
              <li className={styles.footer__items}>
                <div className={styles.footer__link}>Tuyển dụng</div>
              </li>
              <li className={styles.footer__items}>
                <div className={styles.footer__link}>Điều khoản</div>
              </li>
            </ul>
          </div>
          <div className={styles.grid__column24}></div>
          <div className={styles.grid__column24}>
            <h3 className={styles.footer__heading}>Theo dõi chúng tôi trên</h3>
            <ul className={styles.footer__list}>
              <li className={styles.footer__items}>
                <div className={styles.footer__link}>
                  <i className="fab fa-facebook"></i>
                  Facebook
                </div>
              </li>
              <li className={styles.footer__items}>
                <div className={styles.footer__link}>
                  <i className="fab fa-instagram"></i>
                  Insta
                </div>
              </li>
              <li className={styles.footer__items}>
                <div className={styles.footer__link}>
                  <i className="fab fa-google"></i>
                  Google
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.grid__column24}>
            <h3 className={styles.footer__heading}>
              Vào cửa hàng trên ứng dụng
            </h3>
            <div className={styles.footer__img}>
              <img
                src="/assets/img/qr-code.png"
                className={styles.footer__imgqr}
                alt=""
              />
              <div className={styles.footer__imgapp}>
                <div className={styles.footer__imgapplink}>
                  <img
                    src="/assets/img/app-store.png "
                    className={styles.footer__imgstore}
                    alt=""
                  />
                </div>
                <div className={styles.footer__imgapplink}>
                  <img
                    src="/assets/img/googleplay.png "
                    className={styles.footer__imgggplay}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
