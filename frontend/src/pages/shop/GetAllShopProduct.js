import React from 'react'
import AllProducts from "../../components/shop/AllProducts";
import SellerDashboardHeader from '../../components/shop/Layout/SellerDashboardHeader';
import ShopSidebar from '../../components/shop/Layout/ShopSidebar';

const GetAllShopProduct = () => {
  return (
    <div>
        <SellerDashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] md:w-[330px]">
              <ShopSidebar active={3} />
            </div>
            <div className="w-full justify-center flex">
                <AllProducts />
            </div>
          </div>
    </div>
  )
}

export default GetAllShopProduct;
