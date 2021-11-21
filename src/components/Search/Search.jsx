import React, { useState } from "react";
import styles from "./Search.module.css";
import PropTypes from "prop-types";
import "./SearchBar.css";
import data from "./Data.json";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = ({ onChange }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [items, setItems] = useState("");

  const handleFilter = async (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      const getApi = `http://localhost:3002/auctions/search/${searchWord}`;
      const data = await axios(getApi);
      console.log("data", data.data.data.data.auctions);
      setFilteredData(data.data.data.data.auctions);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  return (
    <div>
      {/* <form> */}
      <div className={styles.searchBox}>
        <input
          className={styles.searchTxt}
          type="text"
          name="productName_contains"
          placeholder="Type to search"
          autoComplete="off"
          value={wordEntered}
          onChange={handleFilter}
        />
        {/* <div type="submit" className={styles.searchBtn}>
            <i className="fas fa-search"></i>
          </div> */}
      </div>
      {/* </form> */}
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.map((value, key) => {
            return (
              <Link className="dataItem" key={key} to={`/detail/${value.id}`}>
                <p>{value.name} </p>
                {console.log("key", key)}
              </Link>
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
