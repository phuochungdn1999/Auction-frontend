import React from "react";
import styles from "../../UserCollection.module.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const Filter = () => {
  return (
    <div>
      <div className={styles.Filter}>
        <div className={styles.searchBox} >
          <input
            className={styles.searchTxt}
            type="text"
            name="productName_contains"
            placeholder="Type to search"
            autoComplete="off"
          />
          <div type="submit" className={styles.searchBtn}>
            <i className="fas fa-search"></i>
          </div>
        </div>

        <Box className={styles.listItem} >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Order</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  );
};

export default Filter;
