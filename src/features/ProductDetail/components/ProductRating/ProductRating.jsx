import { AddComment } from '@material-ui/icons';
import React from 'react';
import Commentform from './components/CommentForm';
import styles from './ProductRating.module.css';
const ProductRating = (props) => {
  const { product } = props;
  const ratings = product.ratings;
  console.log(ratings);
  return (
    <div className={styles.container}>
      <h4 className={styles.header}> Đánh giá sản phẩm</h4>
      <div className={styles.commentFormTitle}>Write Comment</div>
      <div className={styles.rating}>
        {ratings ? (
          ratings.map((item) => (
            <div key={item.id} className={styles.comment}>
              {/* <img
                alt="ava"
                className={styles.img}
                src="https://st2.depositphotos.com/2703645/11476/v/450/depositphotos_114764528-stock-illustration-man-avatar-character.jpg"
              /> */}
              <div className={styles.info}>
                <div className={styles.name}>{item.user.name}</div>
                {/* <div className={styles.star}>Luong le</div> */}
                <div className={styles.infoComment}>{item.comment}</div>
              </div>
              {item.responses.map((item1) => (
                <div className={styles.response}>
                  {/* <img
                    alt="ava"
                    className={styles.img}
                    src="https://st2.depositphotos.com/2703645/11476/v/450/depositphotos_114764528-stock-illustration-man-avatar-character.jpg"
                  /> */}
                  <div className={styles.info}>
                    <div className={styles.name}>
                      {' '}
                      Phản hồi của {item1.user.name}
                      {item1.user.role === 'admin' ? (
                        <span className={styles.QTV}>QTV</span>
                      ) : (
                        <span></span>
                      )}
                    </div>
                    <div className={styles.infoComment}>{item1.comment}</div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div>chưa có comment nào</div>
        )}
      </div>
    </div>
  );
};

export default ProductRating;
