import { IconContext } from "react-icons";
import { CgMouse } from "react-icons/cg";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "../extraComponent/Loading";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  loading && <Loading />;
  // if (loading) return <Loading />;
  return (
    <>
      <MetaData title="The Raaz" />
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
        {/* <Product product={product} /> */}
        {products &&
          products.map((product, i) => (
            <Product product={product} key={product._id} />
          ))}
      </div>
    </>
  );
};

export default Home;
