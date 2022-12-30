import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loading from "../extraComponent/Loading";
import ProductCard from "../Home/ProductCard";
import "./Product.css";
const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  console.log(products);
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
        </>
      )}
    </>
  );
};

export default Products;
