import React from 'react'
import CreateEvent from "../../components/shop/CreateEvent";
import ShopSidebar from '../../components/shop/Layout/ShopSidebar';
import SellerDashboardHeader from '../../components/shop/Layout/SellerDashboardHeader';


const ShopCreateEvents = () => {
  return (
    <div>
        <SellerDashboardHeader />
        <div className="flex items-center justify-between w-full">
      <div className="w-[330px]">
        <ShopSidebar active={6} />
      </div>
      <div className="w-full justify-center flex">
        <CreateEvent />
      </div>
    </div>
    </div>
  )
}

export default ShopCreateEvents