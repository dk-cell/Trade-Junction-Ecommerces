import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import styles from "../../style/styles";
import { Link } from "react-router-dom";

const Cart = ({ setOpenCart }) => {
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
              onClick={() => setOpenCart(false)}
            />
          </div>
          <div className={`${styles.normalFlex} p-4`}>
            <IoBagHandleOutline size={25} />
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
        <div className="px-5 md-3">
          <Link to="/checkout">
            <div className="h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]">
              <h1 className="text-[#fff] text-[18px] font-[600]">
                Checkout now (USD $1800)
              </h1>
            </div>
          </Link>
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
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[8px]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="fond-[400] text-[15px] text-[#00000082] ">
            {data.price}*{value}
          </h4>
          <h4 className="fond-[600] text-[17px] text-[#d02222] font-Roboto ">
            US${totalPrice}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Cart;
