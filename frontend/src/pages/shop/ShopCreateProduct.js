import React from "react";
import CreateProduct from "./CreateProduct";
import ShopSidebar from "../../components/shop/Layout/ShopSidebar";
import SellerDashboardHeader from "../../components/shop/Layout/SellerDashboardHeader";

const ShopCreateProduct = () => {
  return (
    <div>
      <SellerDashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] md:w-[330px]">
          <ShopSidebar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProduct;
