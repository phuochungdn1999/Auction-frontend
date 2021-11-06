import React, { useEffect, useState } from 'react';
import './history.css';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import PulseLoader from 'react-spinners/PulseLoader';
const History = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
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
              <div>
                <div className="titles">
                  <h3 className="product-title">Item</h3>
                  <h3 className="price">Price</h3>
                  <h3 className="status">Status</h3>
                  <h3 className="total">Time</h3>
                </div>
                <div className="cart-items">
                  <div className="cart-item">
                    <div className="cart-product">
                      <img
                        src="https://lh3.googleusercontent.com/k6LaoZTSi68Atu1eCjTliBR_dCejX--wxPDywbrn7QdVWYHvPIUtZ1-0Ia7qE30RzugvKPPlLUYuv8w_6HFl"
                        alt="anh"
                      />
                      <div className="boxName">
                        <h3 className="itemName">
                          Laptop HP Pavilion 14-bf016TU (2GE48PA) (14"
                          FHD/i3-7100U/4GB/1TB HDD/HD 620/Free DOS/1.6 kg)
                        </h3>
                      </div>
                    </div>
                    <div className="cart-product-price">123123123123 đ</div>
                    <div className="cart-product-quantity">
                      <div className="count">Sell</div>
                    </div>
                    <div className="cart-product-total-price">
                      12212123123 đ
                    </div>
                  </div>
                </div>
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
