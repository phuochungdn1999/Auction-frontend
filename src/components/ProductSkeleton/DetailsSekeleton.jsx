import React from 'react';
import styles from './ProductSkeleton.module.css';
import { Skeleton } from '@material-ui/lab';
import { Box } from '@material-ui/core';
const Detailssekeleton = () => {
  return (
    <div marginRight={20} xs={12} sm={6} md={4} lg={3}>
      <Box padding={1}>
        <div>
          <Skeleton variant="rect" width={500} height={300} marginBottom={5} />
        </div>
        <div>
          <Skeleton height={150} />
          <Skeleton height={300} />
        </div>
      </Box>
    </div>
  );
};

export default Detailssekeleton;
