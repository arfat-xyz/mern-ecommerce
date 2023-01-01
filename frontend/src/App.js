import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Home from "./component/Home/Home.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import WebFont from "webfontloader";

import Footer from "./component/layout/Footer/Footer";
import ProductDetails from "./component/Product/ProductDetails.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignUp />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
