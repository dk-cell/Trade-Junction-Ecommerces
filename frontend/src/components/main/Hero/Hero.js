import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../style/styles";
import slides from "../../../static/backgroundSliderData";
const Hero = () => {
  const [currentState, setCurrentState] = useState(0);
  const bgImageStyle = {
    backgroundImage: `url(${slides[currentState].url})`,
  };
  useEffect(() => {
    //Implementing the setInterval for sliding
    const interval = setInterval(() => {
      setCurrentState(currentState === 2 ? 0 : currentState + 1);
    }, 3000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [currentState]);

  return (
    <div
      className={`relative min-h-[70vh] md:min-h-[80vh] w-full bg-no-repeat bg-cover bg-center ${styles.normalFlex}`}
      style={bgImageStyle}
    >
      <div className={`ml-[50px] w-[90%] md:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] md:text-[60px] text-[#fff] font-[600] capitalize`}
        >
          Best Collection for <br /> home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#cfcabe]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} bg-[#cfcabe] mt-5 `}>
            <span className="text-[#000] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
