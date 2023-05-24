import React from "react";
import SellerDashboardHeader from "../../components/shop/Layout/SellerDashboardHeader";
import ShopSidebar from "../../components/shop/Layout/ShopSidebar";
import AllCoupons from "../../components/shop/AllCoupons.js";
const ShopAllCoupouns = () => {
  return (
    <div>
      <SellerDashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] md:w-[330px]">
          <ShopSidebar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <AllCoupons />
        </div>
      </div>
    </div>
  );
};

export default ShopAllCoupouns;
