import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import styles from '../../Register.module.css';
const To = () => {
  const [value, setValue] = React.useState(new Date());
  return (
    <React.Fragment>
      <div className={styles.name}>To</div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="To"
          value={value}
          className="datePicker"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </React.Fragment>
  );
};

export default To;
