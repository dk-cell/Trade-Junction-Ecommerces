import React from "react";
import styles from "../../style/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={`block md:${styles.normalFlex}`}>
      {navItems &&
        navItems.map((item, index) => (
          <div className="flex">
            <Link
              to={item.url}
              className={`${
                active === index + 1
                  ? "text-[#fff]"
                  : "text-black md:text-[#C3C3D1]"
              } pb-[30px] md:pb-0 font-[500] px-6  cursor-pointer"
              `}
            >
              {item.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
