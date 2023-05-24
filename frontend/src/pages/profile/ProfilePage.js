import React, { useState } from "react";
import Header from "../../components/Layout/Header";
import styles from "../../style/styles";
import ProfileSidebar from "./ProfileSidebar.js";
import ProfileContent from "./ProfileContent.js";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-[50px] md:w-[335px] md:mt-0 mt-[18%] ">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
};

export default ProfilePage;
