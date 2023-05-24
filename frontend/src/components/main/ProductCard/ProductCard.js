import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../style/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { backendUrl } from "../../../constant";

const ProductCard = ({ data }) => {
  console.log(data);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const name = data.name;
  // const productName = name.replace(/\s+/g, "-");
  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer ">
      <div className="flex justify-end"></div>
      <Link to={`/product/${data._id}`}>
        <img
          src={`${backendUrl}${data.images && data.images[0]}`}
          alt=""
          className="w-full h-[170px] object-contain"
        />
      </Link>
      <Link to={`/shop/preview/${data?.shop._id}`}>
        <h5 className={`${styles.shop_name}`}>{data?.shop.name}</h5>
      </Link>
      <Link to={`/product/${data._id}`}>
        <h4 className="pb-3 font-[500]">
          {data.name.length > 35 ? data.name.slice(0, 35) + "..." : data.name}
        </h4>
        <div className="flex">
          <AiFillStar
            className="mr-2 cursor-pointer"
            color="#F6BA00"
            size={20}
          />
          <AiFillStar
            className="mr-2 cursor-pointer"
            color="#F6BA00"
            size={20}
          />
          <AiFillStar
            className="mr-2 cursor-pointer"
            color="#F6BA00"
            size={20}
          />
          <AiOutlineStar
            className="mr-2 cursor-pointer"
            color="#F6BA00"
            size={20}
          />
        </div>

        <div className=" py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              {data.originalPrice === 0
                ? data.originalPrice
                : data.discountPrice}
              $
            </h5>
            <h4 className={`${styles.price}`}>
              {data.originalPrice ? data.originalPrice + " $" : null}
            </h4>
          </div>

          <span className="font-[400] text-[17px] text-[#68d284]">
            {data.sold_out} sold
          </span>
        </div>
      </Link>
      {/* side icon */}
      <div>
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => setClick(!click)}
            color={click ? "red" : "#333"}
            title="Remove form wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => setClick(!click)}
            color={click ? "red" : "#333"}
            title="Add to wishlist"
          />
        )}

        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-14"
          onClick={() => setOpen(!open)}
          color="#333"
          title="view"
        />
        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer absolute right-2 top-24"
          onClick={() => setOpen(!open)}
          color="#444"
          title="add to cart"
        />
        {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
      </div>
    </div>
  );
};

export default ProductCard;
