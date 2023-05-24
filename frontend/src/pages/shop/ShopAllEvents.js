import React from 'react'
import ShopSidebar from '../../components/shop/Layout/ShopSidebar';
import SellerDashboardHeader from '../../components/shop/Layout/SellerDashboardHeader';

import AllEvents from "../../components/shop/AllEvents";

const ShopAllEvents = () => {
  return (
    <div>
        <SellerDashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] md:w-[330px]">
              <ShopSidebar active={5} />
            </div>
            <div className="w-full justify-center flex">
                <AllEvents />
            </div>
          </div>
    </div>
  )
}

export default ShopAllEvents