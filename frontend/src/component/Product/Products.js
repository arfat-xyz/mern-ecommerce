import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../actions/productAction";
import Loading from "../extraComponent/Loading";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import "./Product.css";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import MetaData from "../layout/MetaData";
import { Grid } from "@mui/material";
const Products = () => {
  const [price, setPrice] = useState([0, 25000]);
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  // const x = useSelector((state) => state.products);
  // console.log("object", x);
  const setCurrentPageNo = (e) => setCurrentPage(e);
  const priceHandler = (e, newPrice) => setPrice(newPrice);
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price));
  }, [dispatch, keyword, currentPage, price]);
  let count = filteredProductsCount;
  // console.log(products);
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
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
              />
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
    </>
  );
};

export default Products;
