import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../actions/productAction";
import Loading from "../extraComponent/Loading";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import "./Product.css";
const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);
  // const x = useSelector((state) => state.products);
  // console.log("object", x);
  const setCurrentPageNo = (e) => setCurrentPage(e);
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);
  // console.log(products);
  loading && <Loading />;
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          {resultPerPage < productsCount && (
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
      )}
    </>
  );
};

export default Products;
