import React, { useEffect, useState } from "react";
import styles from "../style/styles";
import { useSearchParams } from "react-router-dom";
import { product } from "../static/data";
import ProductCard from "../components/main/ProductCard/ProductCard";
import Header from "../components/Layout/Header";

const BestSellingPage = () => {
  const [seachParams] = useSearchParams();
  const categoryData = seachParams.get("category");
  const [data, setData] = useState([]);

  useEffect(() => {
    const d = product && product.sort((a, b) => b.total_sell - a.total_sell);
    setData(d);
  }, []);
  return (
    <div>
      <Header activeHeader={2} />
      <br />
      <br />

      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid:cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-col-5 xl:gap-[30px] md-12 ">
          {data &&
            data.map((item, index) => <ProductCard data={item} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default BestSellingPage;
