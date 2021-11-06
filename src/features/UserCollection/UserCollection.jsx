import React from 'react';
import { useEffect, useState } from 'react';
import styles from './UserCollection.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import queryString from 'query-string';
import ClipLoader from 'react-spinners/ClipLoader';
import Pagination from '../../components/Pagination/Pagination';
import Collection from './components/Collection/Collection';
import Info from './components/Info/Info';
import Filter from './components/Filter/Filter';
const Productlist = () => {
  const history = useHistory();
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 12,
    totalRows: 11,
  });
  const [filters, setFilters] = useState({
    page_size: 12,
    page: 1,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    const param = queryString.stringify(filters);
    const getProductAPI = `https://yshuynh.pythonanywhere.com/api/products?${param}&category=${1}&brands=${1} `;

    axios
      .get(getProductAPI)
      .then((res) => {
        const { page, page_size, total, results } = res?.data;
        if (res?.data) {
          setProduct(results);
          setPagination({ page, page_size, total });
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Xảy ra lỗi');
      });
  }, [id, filters]);
  useEffect(() => {
    setLoading(true);
  }, []);
  useEffect(() => {
    return setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  const handlePageChange = (newPage) => {
    console.log(newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className={styles.sweetLoading}>
          <ClipLoader loading={loading} size={50} />
        </div>
      ) : (
        <React.Fragment>
          <Header />
          <div className={styles.container}>
            <Info />
            <div className={styles.grid}>
              <Filter />
              <div className={styles.grid_row}>
                <div className={styles.grid__column10}>
                  <Collection product={product} />
                </div>
              </div>
            </div>
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Productlist;
