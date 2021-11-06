import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import styles from './Category.module.css';
const Category = () => {
  return (
    <div>
      <FormGroup className={styles.hi}>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Label1"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Label2"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Label2"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Label2"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Label2"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Label2"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Label2"
        />
      </FormGroup>
    </div>
  );
};

export default Category;
