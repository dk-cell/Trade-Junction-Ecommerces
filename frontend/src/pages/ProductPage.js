import React, { useEffect, useState } from "react";
import styles from "../style/styles";
import { useSearchParams } from "react-router-dom";
import { product } from "../static/data";
import ProductCard from "../components/main/ProductCard/ProductCard";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";

const ProductPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [seachParams] = useSearchParams();
  const categoryData = seachParams.get("category");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
        allProducts &&
        allProducts.filter((item) => item.category === categoryData);
      setData(d);
    }
    window.scrollTo(0, 0);
  }, [allProducts]);
  return (
    <div>
      <Header activeHeader={3} />
      <br />
      <br />

      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid:cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-col-5 xl:gap-[30px] md-12 ">
          {data &&
            data.map((item, index) => <ProductCard data={item} key={index} />)}
        </div>
        {data && data.length === 0 && (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No Product Found!
          </h1>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
