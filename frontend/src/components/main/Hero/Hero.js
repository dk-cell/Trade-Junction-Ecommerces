import React from "react";
import styles from "../../../style/styles";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={`${styles.normalFlex} relative min-h-[70vh] min-h-[100vh] w-full bg-no-repeat`}
      style={{
        background:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Best Collection for <br /> home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba] ">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
        <Link  to="/products" >
            <div className={`${styles.button} mt-5`}>
                <span className="text-[#fff] font-[Poppins] text-[18px] ">Shop now</span>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
