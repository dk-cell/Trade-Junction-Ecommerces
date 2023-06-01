import React, { useEffect, useState } from "react";
import styles from "../style/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/main/ProductCard/ProductCard";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import Loader from "../Loader";

const BestSellingPage = () => {
  const [seachParams] = useSearchParams();
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    setData(sortedData);
  }, [allProducts]);
  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <Header activeHeader={2} />
          <br />
          <br />

          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid:cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-col-5 xl:gap-[30px] md-12 ">
              {data &&
                data.map((item, index) => (
                  <ProductCard data={item} key={index} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
