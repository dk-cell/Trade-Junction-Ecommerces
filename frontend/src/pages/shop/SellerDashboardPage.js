import React from "react";
import SellerDashboardHeader from "../../components/shop/Layout/SellerDashboardHeader";
import ShopSidebar from "../../components/shop/Layout/ShopSidebar";
import AllEvents from "../../components/shop/AllEvents";
const SellerDashboardPage = () => {
  return (
    <div>
      <SellerDashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] md:w-[330px]">
          <ShopSidebar active={1} />
        </div>
        <div className="w-full justify-center flex">
          <AllEvents />
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardPage;
