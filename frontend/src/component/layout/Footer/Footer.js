import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>The Raaz.</h1>
        <p>High Quality is our first priority</p>

        <p>
          Copyrights 2021 &copy;{" "}
          <a style={{ color: "#fff" }} href="https://www.arfat.xyz/">
            arfat.xyz
          </a>
        </p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/arfat.xyz/">
          <BsInstagram size={"0.8rem"} /> Instagram
        </a>
        <a href="https://www.linkedin.com/in/arfatxyz/">
          <BsLinkedin size={"0.8rem"} /> LinkedIn
        </a>
        <a href="https://www.facebook.com/arfat.xyz">
          <BsFacebook size={"0.8rem"} /> Facebook
        </a>
      </div>
    </footer>
  );
};

export default Footer;
