import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backendUrl } from "../../../constant";

const SellerDashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-[#343a40] shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/dashboard">
          <img
            src={require("../../../assests/animations/TradeJuctionlogo.png")}
            alt=""
            className="w-[280px] h-[280px]"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/cupouns" className="md:block hidden">
            <AiOutlineGift
              color="#fff"
              size={30}
              className="mx-5 cursor-pointer text-[#fff]"
            />
          </Link>
          <Link to="/dashboard-events" className="md:block hidden">
            <MdOutlineLocalOffer
              color="#fff"
              size={30}
              className="mx-5 cursor-pointer text-[#fff]"
            />
          </Link>
          <Link to="/dashboard-products" className="md:block hidden">
            <FiShoppingBag
              color="#fff"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="md:block hidden">
            <FiPackage color="#fff" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/dashboard-messages" className="md:block hidden">
            <BiMessageSquareDetail
             color="#fff"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${backendUrl}${seller.avatar}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardHeader;
