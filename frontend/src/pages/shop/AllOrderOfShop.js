import React from "react";
import AllOrders from "../../components/shop/AllOrders.js";
import SellerDashboardHeader from "../../components/shop/Layout/SellerDashboardHeader";
import ShopSidebar from "../../components/shop/Layout/ShopSidebar";

const AllOrderOfShop = () => {
  return (
    <div>
      <SellerDashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] md:w-[330px]">
          <ShopSidebar active={2} />
        </div>
        <div className="w-full justify-center flex">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default AllOrderOfShop;
