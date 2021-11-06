import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import styles from '../../Register.module.css';
const From = () => {
  const [value, setValue] = React.useState(new Date());
  return (
    <React.Fragment>
      <div className={styles.name}>
        From
        <span className={styles.required}>*</span>
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="From"
          value={value}
          className="datePicker"
          minDate={new Date()}
          // maxDate={new Date(value)}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </React.Fragment>
  );
};

export default From;
