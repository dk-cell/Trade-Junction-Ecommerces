import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Loader";
const SellerProtectedRoute = ({ children }) => {
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  if (isLoading) {
    return <Loader />;
  }
  if (isLoading === false) {
    if (!isSeller) {
      return <Navigate to={`/shop-login`} replace />;
    }
    return children;
  }
};

export default SellerProtectedRoute;
