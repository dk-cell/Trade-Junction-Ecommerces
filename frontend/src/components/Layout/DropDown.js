import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../style/styles";

const DropDown = (props) => {
  const navigate = useNavigate();
  console.log(props);
  const handleSubmit = (item) => {
    navigate(`/products?category=${item.title}`);
    props.setDropDown(false);
    window.location.reload();
  };
  return (
    <>
      <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
        {props.categoriesData &&
          props.categoriesData.map((item, index) => (
            <div
              key={index}
              className={`${styles.normalFlex}`}
              onClick={() => handleSubmit(item)}
            >
              <img
                src={item.image_Url}
                alt=""
                style={{
                  width: "25x",
                  height: "25px",
                  objectFit: "contain",
                  marginLeft: "10px",
                  userSelect: "none",
                }}
              />
              <h3 className="m-3 cursor-pointer select-none">{item.title}</h3>
            </div>
          ))}
      </div>
    </>
  );
};

export default DropDown;
