import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import styles from "../../style/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backendUrl, baseUrl } from "../../constant";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  const handleRemove = (data) => {
    dispatch(removeFromCart(data));
  };
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const handleQtyChange = (data) => {
    dispatch(addTocart(data));
  };
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 ">
      <div className="fixed top-0 right-0 min-h-full w-[25%] h-[100%] bg-white flex flex-col justif-between shadow-sm">
        <div className="flex w-full justify-end pt-5 pr-5">
          <RxCross1
            size={25}
            className="cursor-pointer"
            onClick={() => setOpenCart(false)}
          />
        </div>
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <h4>No items in cart!</h4>
          </div>
        ) : (
          <div>
            <div>
              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 tex-[20px] font-[500]">
                  {cart && cart.length} Items
                </h5>
              </div>

              {/* cart */}
              <br />

              <div className="w-full border-t">
                {cart &&
                  cart.map((item, index) => (
                    <RenderCart
                      data={item}
                      key={index}
                      handleRemove={handleRemove}
                      handleQtyChange={handleQtyChange}
                    />
                  ))}
              </div>
            </div>
            <div className="px-5 md-3">
              <Link to="/checkout">
                <div className="h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]">
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout now ({totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RenderCart = ({ data, handleQtyChange, handleRemove }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  const handleIncrement = () => {
    if (data.stock > value) {
      setValue(value + 1);
      const updateCart = { ...data, qty: value + 1 };
      handleQtyChange(updateCart);
    } else {
      toast.error("stocks not available!");
    }
  };
  const handleDecrement = () => {
    setValue(value === 1 ? 1 : value - 1);

    const updateCart = { ...data, qty: value === 1 ? 1 : value - 1 };
    handleQtyChange(updateCart);
  };
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => handleIncrement(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[8px]">{data.qty}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => handleDecrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${backendUrl}${data?.images[0]}`}
          className="w-[80px] h-[80px] ml-2 mr-2 rounded-[5px]"
          alt=""
        />
        <div className="pl-[5px]">
          <h1>
            {data.name.length > 35 ? data.name.slice(0, 35) + "..." : data.name}
          </h1>
          <h4 className="fond-[400] text-[15px] text-[#00000082] ">
            {data.discountPrice}*{data.qty}
          </h4>
          <h4 className="fond-[600] text-[17px] text-[#d02222] font-Roboto ">
            US$ {totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
          onClick={() => handleRemove(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
