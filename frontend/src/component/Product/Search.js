import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./Search.css";
const Search = () => {
  const history = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/products/${keyword}`);
    } else {
      history("/products");
    }
  };
  return (
    <>
      <MetaData title={"Search a product"} />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a product"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
