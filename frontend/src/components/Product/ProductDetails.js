import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../style/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backendUrl } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsOfShop } from "../../redux/actions/product";
import { addTocart } from "../../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import { toast } from "react-toastify";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.carts);
  const { wishlist } = useSelector((state) => state.wishlists);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsOfShop(data && data.shop._id));
  }, [dispatch, data]);

  useEffect(() => {
    const isItemExist = wishlist && wishlist.find((i) => i._id == data._id);
    if (isItemExist) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [click,data]);

  const handleAddToCart = (id) => {
    const isItemExist = cart && cart.find((i) => i._id == id);
    if (isItemExist) {
      toast.error("Item is already in Cart!");
    } else {
      if (data.stock >= 1) {
        dispatch(addTocart(data));
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

  const handleDecrement = () => {
    setCount(count + 1);
  };
  const handleIncrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const handleMessage = () => {
    navigate("/indox?talk=45dfd546sdf31dsf78re");
  };
  return (
    <div className="bg-white">
      {data && (
        <div className={`${styles.section} w-[90%] md:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full md:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backendUrl}${data && data.images[select]}`}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        className={`${
                          select === 0 ? "border" : "null"
                        } cursor-pointer`}
                      >
                        <img
                          src={`${backendUrl}${i}`}
                          alt=""
                          className="h-[200px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  ></div>
                </div>
              </div>
              <div className="w-full md:w-[50%] pt-5">
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
                  className={`${styles.button} !mt-6 !rounded h-11 flex items-center`}
               onClick={()=>handleAddToCart(data)} >
                  <span className="text-[#fff] flex items-center">
                    Add to cart
                    <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <img
                    src={`${backendUrl}${data?.shop?.avatar}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">{4.5}Ratings</h5>
                    </Link>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={() => handleMessage}
                  >
                    <span className="text-white flex items-center">
                      Send Message
                      <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <RenderProductDetail data={data} products={products} />
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

const RenderProductDetail = ({ data, products }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 md:px-10 py-2 rounded ">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 && <div className={`${styles.active_indicator}`}></div>}
        </div>

        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 && <div className={`${styles.active_indicator}`}></div>}
        </div>

        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 && <div className={`${styles.active_indicator}`}></div>}
        </div>
      </div>
      {active === 1 && (
        <>
          <p className="py-2 text[19px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      )}
      {active === 2 && (
        <div className="w-full flex justify-center items-center min-h-[40vh] ">
          <p>No Reviews !</p>
        </div>
      )}
      {active === 3 && (
        <div className="w-full block md:flex p-5">
          <div className="w-full md:w-[50%]">
            <div className="flex items-center">
              <img
                src={`${backendUrl}${data.shop.avatar}`}
                className="w-[50px] h-[50px] rounded-full"
                alt=""
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-3 text-[15px]">{data.shop.ratings}Ratings</h5>
              </div>
            </div>
            <p className="pt-2">
              1Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="w-full md:w-[50%] mt-5 md:mt-0 md:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[f00]">
                Joined on :{" "}
                <span className="font-[500">
                  {data.shop.createdAt?.slice(0, 10)}
                </span>
              </h5>

              <h5 className="font-[f00]">
                Total Product :{" "}
                <span className="font-[500">
                  {products && products?.length}
                </span>
              </h5>

              <h5 className="font-[f00]">
                Total Reviews : <span className="font-[500">203</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
