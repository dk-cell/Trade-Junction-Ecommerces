import React from "react";
import Checkout from "../components/checkout/Checkout";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import Header from "../components/Layout/Header.js";
import Footer from "../components/Layout/Footer.js";

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
