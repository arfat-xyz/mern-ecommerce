// import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
// import MetaData from "../layout/MetaData";
// import { clearErrors, getProduct } from "../../actions/productAction";
// import { useSelector, useDispatch } from "react-redux";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";

// temporary product
const product = {
  name: "arfat",
  images: [
    {
      url: "https://i.ibb.co/JdyvG1V/model-man-clothing-black-outerwear-jacket-1594696-pxhere-com.jpg",
    },
  ],
  price: "$200",
  _id: "arfat",
  ratings: 5,
};

const Home = () => {
  return (
    <>
      {/* banner section  */}
      <div className="banner">
        <p>Welcome to The Raaz.</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />{" "}
          </button>
        </a>
      </div>

      {/* feature prducts  */}
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />

        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;
