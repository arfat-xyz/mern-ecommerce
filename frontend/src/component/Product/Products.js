import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError, getProduct } from "../../actions/productAction";
import Loading from "../extraComponent/Loading";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import "./Product.css";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import MetaData from "../layout/MetaData";
import { Grid } from "@mui/material";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "arfat",
  "phone",
  "Camera",
  "SmartPhones",
];
const Products = () => {
  const [price, setPrice] = useState([0, 25000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { keyword } = useParams();
  const dispatch = useDispatch();
  const {
    products,
    loading,
    errorMessage,
    productsCount,
    resultPerPage,
    // filteredProductsCount,
  } = useSelector((state) => state.products);
  // const x = useSelector((state) => state.products);
  // console.log("object", x, filteredProductsCount);
  const setCurrentPageNo = (e) => setCurrentPage(e);
  const priceHandler = (e, newPrice) => setPrice(newPrice);
  // console.log(errorMessage);
  errorMessage && toast.error(errorMessage);
  useEffect(() => {
    if (errorMessage) {
      dispatch(clearError());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, errorMessage]);
  let count = productsCount;
  /* console.log(
    "products",
    products,
    keyword,
    "currentPage",
    currentPage,
    price,
    category,
    ratings
  ); */
  loading && <Loading />;
  return (
    <>
      <>
        <h2 className="productsHeading">Products</h2>

        {/* show all products  */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <div className="filterBox">
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
              />

              {/* select category  */}
              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {" "}
                    {category}{" "}
                  </li>
                ))}
              </ul>

              {/* select ratings  */}
              <fieldset
                style={{
                  borderRadius: "10px",
                  padding: "5px 15px",
                }}
              >
                <Typography
                  component={"legend"}
                  style={{
                    margin: "auto 5px",
                    padding: "5px",
                  }}
                >
                  Rating Above
                </Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  valueLabelDisplay="auto"
                  aria-labelledby="coutinous-slider"
                  max={5}
                  min={0}
                />
              </fieldset>
            </div>
          </Grid>
          <Grid item xs={12} md={10}>
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="products">
                  {products?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </>
            )}
          </Grid>
        </Grid>

        {/* pagination for product page  */}
        {resultPerPage < count && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}
      </>
      <MetaData title={"Products"} />
    </>
  );
};

export default Products;
