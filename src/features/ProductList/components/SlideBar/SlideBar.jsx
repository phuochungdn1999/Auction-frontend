import React from "react";
import styles from "../../ProductList.module.css";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import SlideItem from "./components/SlideItem";

const SlideBar = ({ categories }) => {
  const history = useHistory();
  const [categoryType, setCategoryType] = useState("ALL");
  const [status, setStatus] = useState("");
  return (
    <React.Fragment>
      <div className={styles.category}>
        <div className={styles.categoryHeading}>Filter</div>
        <div className={styles.categoryList}>
          <div className={styles.categoryItem}>
            {categories.map((item) => (
              <React.Fragment key={item.id}>
                <div className={styles.categoryItemLink}>
                  <span
                    onClick={() => {
                      history.push(`/productList?category=${item.id}`);
                    }}
                  >
                    {item.name}
                  </span>
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
