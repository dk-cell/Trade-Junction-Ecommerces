import React, { useEffect } from "react";
import CreateShop from "../../components/shop/CreateShop";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopCreatePage = () => {
  const { isSeller, seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSeller) {
      navigate(`/shop/${seller._id}`);
    }
  }, []);
  return (
    <div>
      <CreateShop />
    </div>
  );
};

export default ShopCreatePage;
