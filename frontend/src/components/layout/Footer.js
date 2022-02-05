import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Fragment>
      <footer id="footer">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/shopit_logo2.png" alt="ShopIt Ltd" />
            </Link>
          </div>
        </div>

        <div className="footer-main">
          <div className="footer-links">
            <ol>
              {" "}
              Kigali Mall is an online company that works <br />
              in Rwanda where you can order our products<br></br>
              and then we deliver for free at your place.
            </ol>

            <ul>
              <li>Accpted Payment Method:</li>
              <ol>
                <img src="/images/paylogo.jpg" alt="Payment Methods" />
              </ol>
            </ul>

            <ul>
              <li>Contact Us:</li>
              <ol>shopitltd@gmail.com</ol>
              <ol>+250788997616</ol>
              <ol>+250788872889</ol>
            </ul>
            <ul>
              <li>Our Social Media:</li>
              <ol>
                <a href="https://facebook.com/" className="fa fa-facebook">
                  {" "}
                  Facebook
                </a>
              </ol>
              <ol>
                <a href="https://instagram.com/" class="fa fa-instagram">
                  {" "}
                  Instagram
                </a>
              </ol>
              <ol>
                <a
                  href="https://twitter.com/HabinezaCedric/status/1246284234865680386"
                  class="fa fa-twitter"
                >
                  {" "}
                  Twitter
                </a>
              </ol>
            </ul>
          </div>

          <div className="footer-bar">
            <p>
              &copy;KigaliMall 2020-2022,{" "}
              <a href="www.kigalimall.com">www.kigalimall.com</a> All Rights
              Reserved
            </p>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
