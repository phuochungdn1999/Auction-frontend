import React from 'react';
import styles from '../../ProductList.module.css';
import { useHistory } from 'react-router';
import SlideItem from './components/SlideItem';

const SlideBar = ({ category }) => {
  const history = useHistory();
  return (
    <React.Fragment>
      <div className={styles.category}>
        <div className={styles.categoryHeading}>Filter</div>
        <div className={styles.categoryList}>
          <div className={styles.categoryItem}>
            {category.map((item) => (
              <React.Fragment key={item.id}>
                <div className={styles.categoryItemLink}>
                  <span
                    onClick={() => {
                      history.push(`/productList/${item.id}`);
                    }}
                  >
                    {item.name}
                  </span>

                  <SlideItem icon={'fas fa-plus'}>
                    <div className={styles.brand}>
                      {item.brands.map((item1) => (
                        <div
                          className={styles.name}
                          key={item1.id}
                          onClick={() => {
                            history.push(
                              `/productList/${item.id}&brand=${item1.id}`
                            );
                          }}
                        >
                          {item1.name}
                        </div>
                      ))}
                    </div>
                  </SlideItem>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className={styles.categoryHeading}>Find By</div>
        <div className={styles.categoryList}>
          <div className={styles.categoryItem}>
            <div className={styles.categoryItemLink}>Price</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SlideBar;
