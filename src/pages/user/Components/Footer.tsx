import React from "react";
import { Link } from "react-router-dom";

// IMAGES LOGO
import logo2 from "../img/logo2.png";

// IMAGES PAYMENTS
import pay_1 from "../img/payment/payment-1.png";
import pay_2 from "../img/payment/payment-2.png";
import pay_3 from "../img/payment/payment-3.png";
import pay_4 from "../img/payment/payment-4.png";
import pay_5 from "../img/payment/payment-5.png";
import "./Footer.css";
import { Typography } from "@material-tailwind/react";

type Props = {};
const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];
const currentYear = new Date().getFullYear();

const Footer_component = (props: Props) => {
  return (
    <>
      {/* FOOTER SESSION START */}
      <div className="footer">
        {/* <div className="footer-static-top">
                <div className="container">
                    <div className="footer-shipping pt-60 pb-55 pb-xs-25">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                                <div className="li-shipping-inner-box">
                                    <div className="shipping-icon">
                                        <img src={Global.Footer1} alt="Shipping Icon" />
                                    </div>
                                    <div className="shipping-text">
                                        <h2>Free Delivery</h2>
                                        <p>And free returns. See checkout for delivery dates.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                                <div className="li-shipping-inner-box">
                                    <div className="shipping-icon">
                                        <img src={Global.Footer2} alt="Shipping Icon" />
                                    </div>
                                    <div className="shipping-text">
                                        <h2>Safe Payment</h2>
                                        <p>Pay with the world's most popular and secure payment methods.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                                <div className="li-shipping-inner-box">
                                    <div className="shipping-icon">
                                        <img src={Global.Footer3} alt="Shipping Icon" />
                                    </div>
                                    <div className="shipping-text">
                                        <h2>Shop with Confidence</h2>
                                        <p>Our Buyer Protection covers your purchasefrom click to delivery.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                                <div className="li-shipping-inner-box">
                                    <div className="shipping-icon">
                                        <img src={Global.Footer4} alt="Shipping Icon" />
                                    </div>
                                    <div className="shipping-text">
                                        <h2>24/7 Help Center</h2>
                                        <p>Have a question? Call a Specialist or chat online.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        <div className="footer-static-middle">
          <div className="container">
            <div className="footer-logo-wrap pt-50 pb-35">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="footer-logo">
                    <p className="info">
                      We are a team of designers and developers that create high
                      quality HTML Template & Woocommerce, Shopify Theme.
                    </p>
                  </div>
                  <ul className="des">
                    <li>
                      <span>Address: </span>
                      Khu đô thị FPT City, Ngũ Hành Sơn, Đà Nẵng 550000
                    </li>
                    <li>
                      <span>Phone: </span>
                      <a href="#">0905222529</a>
                    </li>
                    <li>
                      <span>Email: </span>
                      <a href="mailto://rjotnotinh16969@gmail.com">
                        thienhn2k2@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6">
                  <div className="footer-block">
                    <h3 className="footer-block-title">Product</h3>
                    <ul>
                      <li>
                        <a href="#">Prices drop</a>
                      </li>
                      <li>
                        <a href="#">New products</a>
                      </li>
                      <li>
                        <a href="#">Best sales</a>
                      </li>
                      <li>
                        <a href="#">Contact us</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6">
                  <div className="footer-block">
                    <h3 className="footer-block-title">Our company</h3>
                    <ul>
                      <li>
                        <a href="#">Delivery</a>
                      </li>
                      <li>
                        <a href="#">Legal Notice</a>
                      </li>
                      <li>
                        <a href="#">About us</a>
                      </li>
                      <li>
                        <a href="#">Contact us</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="footer-newsletter">
                    <h4>Sign up to newsletter</h4>
                    <form
                      action="#"
                      method="post"
                      id="mc-embedded-subscribe-form"
                      name="mc-embedded-subscribe-form"
                      className="footer-subscribe-form validate"
                      target="_blank"
                    >
                      <div id="mc_embed_signup_scroll">
                        <div
                          id="mc-form"
                          className="mc-form subscribe-form form-group"
                        >
                          <input
                            id="mc-email"
                            type="email"
                            autoComplete="off"
                            placeholder="Enter your email"
                          />
                          <button className="btn" id="mc-submit">
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer_component;
