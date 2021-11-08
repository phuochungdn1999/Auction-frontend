import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '@material-ui/lab';
import { Box } from '@material-ui/core';
import styles from './ProductSkeleton.module.css';
const ProductSkeleton = ({ length = 12 }) => {
  return (
    <div className={styles.SkeletonContainer}>
      {Array.from(new Array(length)).map((x, index) => (
        <div marginRight={20} item key={index} xs={12} sm={6} md={4} lg={3}>
          <Box padding={1}>
            <Skeleton variant="rect" width="300px" height={118} />
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        </div>
      ))}
    </div>
  );
};
ProductSkeleton.propTypes = {
  length: PropTypes.number,
};

export default ProductSkeleton;
