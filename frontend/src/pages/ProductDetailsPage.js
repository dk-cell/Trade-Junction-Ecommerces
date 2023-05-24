import React, { useEffect, useState } from "react";
import ProductDetails from "../components/Product/ProductDetails";
import Header from "../components/Layout/Header.js";
import Footer from "../components/Layout/Footer.js";
import ShowRelatedProduct from "../components/ShowRelatedProduct";
import { useParams } from "react-router-dom";
import { product } from "../static/data.js";
import { useSelector } from "react-redux";
const ProductDetailsPage = () => {
  const { id } = useParams();
  const { allProducts } = useSelector((state) => state.products);
  const { name } = useParams();
  const [data, setData] = useState("");

  // const productName = name.replace(/-/g, " ");

  useEffect(() => {
    // if (eventData !== null) {
    //   const data = allEvents && allEvents.find((i) => i._id === id);
    //   setData(data);
    // } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    // }
  }, [allProducts]);
  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <ShowRelatedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
