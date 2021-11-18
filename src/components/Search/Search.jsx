import React, { useState } from "react";
import styles from "./Search.module.css";
import PropTypes from "prop-types";
import "./SearchBar.css";
import data from "./Data.json";
const Search = ({ onChange }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  return (
    <div>
      <form>
        <div className={styles.searchBox}>
          <input
            className={styles.searchTxt}
            type="text"
            name="productName_contains"
            placeholder="Type to search"
            autoComplete="off"
            onChange={handleFilter}
          />
          <div type="submit" className={styles.searchBtn}>
            <i className="fas fa-search"></i>
          </div>
        </div>
      </form>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank">
                <p>{value.title} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};
Search.propTypes = {
  onChange: PropTypes.func,
};
export default Search;
