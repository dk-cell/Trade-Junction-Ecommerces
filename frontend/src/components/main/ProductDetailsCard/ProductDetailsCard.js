import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../style/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backendUrl } from "../../../constant";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.carts);
  const { wishlist } = useSelector((state) => state.wishlists);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false);
  const handleSubmit = () => {};
  const handleDecrement = () => {
    setCount(count > 1 ? count - 1 : 1);
  };
  const handleIncrement = () => {
    setCount(
      count < data.stock ? count + 1 : toast.error("Item is already in Cart!")
    );
  };
  useEffect(()=>{
    const isItemExist = wishlist && wishlist.find((i) => i._id == data._id);
    if(isItemExist){
      setClick(true)
    }else{
      setClick(false)
    }
  },[click])
  const handleAddToCart = (id) => {
    const isItemExist = cart && cart.find((i) => i._id == id);
    if (isItemExist) {
      toast.error("Item is already in Cart!");
    } else {
      if (data.stock > count) {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added successfully!");
      } else {
        toast.error("stocks not available!");
      }
    }
  };

  const handleWishlist = (id) => {
    if (!click) {
      console.log(data);
      dispatch(addToWishlist(data));
      toast.success("Item added to wishlist successfully!");
    } else {
      dispatch(removeFromWishlist(data));
      toast.success("Item removed from wishlist successfully!");
      // setClick(!click);
    }
    setClick(!click);
  };
  return (
    <div className="bg-[#fff]">
      {data && (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center ">
          <div className="w-[60%] h-[90vh] overflow-y-scroll bg-white rounded-md shadow-sm relative p-4 ">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="block w-full flex">
              <div className="w-fulll w-[50%]">
                <img
                  src={`${backendUrl}${data.images && data.images[0]}`}
                  alt=""
                />
                <div className="flex">
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                    <img
                      src={`${backendUrl}${data?.shop?.avatar}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2 "
                    />
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">5 Ratings</h5>
                    </div>
                  </Link>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  onClick={handleSubmit}
                >
                  <span className="text-[#fff] flex items-center ">
                    Send Message <AiOutlineMessage className="ml-1" />{" "}
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5 ">
                  {data.sold_out} Sold out
                </h5>
              </div>

              <div className="w-full w-[50%] pt-5 pll-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={handleDecrement}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={handleIncrement}
                    >
                      +
                    </button>
                  </div>

                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => handleWishlist(data)}
                        color={click ? "red" : "#333"}
                        title="Remove form wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => handleWishlist(data)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`${styles.button} mt-6 rounded h-11 flex items-center`}
                  onClick={() => handleAddToCart(data._id)}
                >
                  <span className="text-[#fff] flex items-center ">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsCard;
