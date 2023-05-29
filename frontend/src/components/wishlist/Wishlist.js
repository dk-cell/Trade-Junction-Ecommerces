import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../style/styles";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { backendUrl } from "../../constant";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";

const Wishlist = ({ setWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlists);
  const dispatch = useDispatch();
  const handleRemove = (data) => {
    dispatch(removeFromWishlist(data));
    toast.success("Item removed from wishlist successfully!");
  };
  const handleAddToCart = (data) => {
    const cartData = { ...data, qty: 1 };
    dispatch(addTocart(cartData));
    toast.success("Item added to cart successfully!");
    dispatch(removeFromWishlist(data));
  };
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 ">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justif-between shadow-sm">
        <div className="flex w-full justify-end pt-5 pr-5">
          <RxCross1
            size={25}
            className="cursor-pointer"
            onClick={() => setWishlist(false)}
          />
        </div>
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <h4>Your wishlist is empty!</h4>
          </div>
        ) : (
          <div>
            <div className={`${styles.normalFlex} p-4`}>
              <AiOutlineHeart size={25} />
              <h5 className="pl-2 tex-[20px] font-[500]">
                {wishlist && wishlist.length} Items
              </h5>
            </div>

            {/* cart */}
            <br />

            <div className="w-full border-t">
              {wishlist &&
                wishlist.map((item, index) => (
                  <RenderWishlist
                    data={item}
                    key={index}
                    handleRemove={handleRemove}
                    handleAddToCart={handleAddToCart}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RenderWishlist = ({ data, handleRemove, handleAddToCart }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1
          className="cursor-pointer"
          onClick={() => handleRemove(data)}
        />
        <img
          src={`${backendUrl}${data.images[0]}`}
          className="w-[80px] h-[80px] m-2 "
        />

        <div className="pl-[5px]">
          <h1>
            {" "}
            {data.name.length > 35 ? data.name.slice(0, 35) + "..." : data.name}
          </h1>

          <h4 className="fond-[600] text-[17px] text-[#d02222] font-Roboto ">
            US$ {data.discountPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to cart"
            onClick={() => {
              handleAddToCart(data);
              
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
