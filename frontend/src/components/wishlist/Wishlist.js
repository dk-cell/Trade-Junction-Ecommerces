import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../style/styles";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

const Wishlist = ({ setWishlist }) => {
  const cartData = [
    {
      name: "Iphone 14 pro max 256 gb ssd and 8gb ram silver",
      discription: "text",
      price: 999,
    },
    {
      name: "Iphone 14 pro max 256 gb ssd and 8gb ram silver",
      discription: "text",
      price: 999,
    },
    {
      name: "Iphone 14 pro max 256 gb ssd and 8gb ram silver",
      discription: "text",
      price: 999,
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 ">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justif-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setWishlist(false)}
            />
          </div>
          <div className={`${styles.normalFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 tex-[20px] font-[500]">3 Items</h5>
          </div>

          {/* cart */}
          <br />

          <div className="w-full border-t">
            {cartData &&
              cartData.map((item, index) => (
                <RenderCart data={item} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const RenderCart = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1 className="cursor-pointer" />
        <img
          src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
          className="w-[80px] h-[80px] m-2 "
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>

          <h4 className="fond-[600] text-[17px] text-[#d02222] font-Roboto ">
            US${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to cart"
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
