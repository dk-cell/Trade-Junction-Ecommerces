import React, { useEffect, useState } from "react";
import styles from "../../style/styles";
import { Link } from "react-router-dom";
import { categoriesData, product } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../wishlist/Wishlist";
import { backendUrl, baseUrl } from "../../constant";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeader }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.carts);
  const { wishlist } = useSelector((state) => state.wishlists);
  const { allProducts } = useSelector((state) => state.products);
  const [searchItem, setSearchItem] = useState("");
  const [searchedData, setSearchedData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {}, []);

  console.log("=====>", isAuthenticated);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchItem(search);

    const fileredData =
      allProducts &&
      allProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    setSearchedData(fileredData);
  };
  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden md:h-[50px] md:my-[20px] md:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src={require("../../assests/animations/TradeJuctionlogo.png")}
                alt=""
                className="w-[280px] h-[280px]"
              />
            </Link>
          </div>
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="search product..."
              // value={searchedData}
              onChange={handleSearch}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchedData && searchedData.length !== 0 && (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchedData &&
                  searchedData.map((item, key) => {
                    const d = item.name;
                    // const product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${item._id}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={`${backendUrl}${item.images[0]}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{item.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>
          <div className={`${styles.button} md:min-w-[25%]`}>
            <Link to="/create-shop">
              <h1 className="text-[#fff] flex items-center">
                Sell on TradeJuction <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden md:flex items-center justify-between w-full bg-[#343a40] h-[70px]}`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden lg:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button className="h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              )}
            </div>
          </div>
          {/* Nav */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeader} />
          </div>

          <div className={`${styles.normalFlex}`}>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineHeart
                  size={30}
                  color="rgb(255 2555 255/83%)"
                  onClick={() => setWishlist(!openWishlist)}
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 2555 255/83%)"
                  onClick={() => setOpenCart(!openCart)}
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${backendUrl}${user.avatar}`}
                      className="w-[35px] h-[35px] rounded-full "
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 2555 255/83%)" />
                  </Link>
                )}
              </div>
            </div>
            {openCart && <Cart setOpenCart={setOpenCart} />}
            {openWishlist && <Wishlist setWishlist={setWishlist} />}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[130px] bg-[#343a40] z-50 top-0 left-0 shadow-sm md:hidden relative`}
      >
        <div className="w-full flex items-center justify-between bg-red">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 text-white"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src={require("../../assests/animations/TradeJuctionlogo.png")}
                alt="shop_logo"
                className="w-[150px] h-[120px] cursor-pointer mt-0 top-[10px]"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px] text-white"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setWishlist={setWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px] relative">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchItem}
                  onChange={handleSearch}
                />
                {searchedData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchedData.map((i) => {
                      const d = i.name;

                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`}>
                          <div className="flex items-center">
                            <img
                              src={i.image_Url[0].url}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeader} />
              <div className={`${styles.button} ml-4 !rounded-[4px] w-[50%] items-center justify-center flex` }>
                <Link to="/create-shop">
                  <h1 className="text-[#fff] flex items-center">
                    Sell on TradeJuction <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${backendUrl}${user?.avatar}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
