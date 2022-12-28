import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Home from './component/Home/Home.js'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from "react";
import WebFont from "webfontloader";

import Footer from "./component/layout/Footer/Footer";
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <>
      <Router>
        <Header />
        <Route exact path="/" element={<Home />} />
        <Footer />
      </Router>
    </>
  );
}

export default App;
