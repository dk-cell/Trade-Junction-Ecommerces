import React from 'react'
import Footer from '../../components/Layout/Footer'
import OrderDetails from "../../components/shop/OrderDetails.js";
import SellerDashboardHeader from '../../components/shop/Layout/SellerDashboardHeader';

const ShopOrderDetails = () => {
  return (
    <div>
       <SellerDashboardHeader />
         <OrderDetails />
          <Footer />
    </div>
  )
}

export default ShopOrderDetails