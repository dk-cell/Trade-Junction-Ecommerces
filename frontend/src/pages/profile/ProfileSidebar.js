import React from "react";
import {
  AiOutlineCreditCard,
  AiOutlineLogout,
  AiOutlineMessage,
} from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { TbAddressBook } from "react-icons/tb";
import { MdOutlineTrackChanges } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../constant";
import { toast } from "react-toastify";

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  function handleLogout() {
    axios
      .get(`${baseUrl}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
        window.location.reload(true);
      })
      .catch((err) => toast.error(err.response.data.message));
  }

  return (
    <div className="w-full bg-white shadow-s, rounded-[10px] p-4 pt-8">
      <div
        className="flex item-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span className={`${active === 1 ? "text-[red]" : ""} pl-3 md:block hidden`}>
          Profile
        </span>
      </div>

      <div
        className="flex item-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span className={`${active === 2 ? "text-[red]" : ""} pl-3 md:block hidden`}>
          Orders
        </span>
      </div>

      <div
        className="flex item-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span className={`${active === 3 ? "text-[red]" : ""} pl-3 md:block hidden`}>
          Refunds
        </span>
      </div>

      <div
        className="flex item-center cursor-pointer w-full mb-8"
        onClick={() => {
          setActive(4);
          navigate("/inbox");
        }}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span className={`${active === 4 ? "text-[red]" : ""} pl-3 md:block hidden`}>
          Inbox
        </span>
      </div>

      <div
        className="flex item-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span className={`${active === 5 ? "text-[red]" : ""} pl-3 md:block hidden`}>
          Track Orders
        </span>
      </div>

      <div
        className="flex item-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <AiOutlineCreditCard size={20} color={active === 6 ? "red" : ""} />
        <span className={`${active === 6 ? "text-[red]" : ""} pl-3 md:block hidden`}>
          Payment Methods
        </span>
      </div>

      <div
        className="flex item-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span className={`${active === 7 ? "text-[red]" : ""} pl-3 md:block hidden`}>
          Address
        </span>
      </div>

      <div
        className="flex item-center cursor-pointer w-full mb-8"
        onClick={() => {
          setActive(8);
          handleLogout();
        }}
      >
        <AiOutlineLogout size={20} color={active === 8 ? "red" : ""} />
        <span className={`${active === 8 ? "text-[red]" : ""} pl-3 md:block hidden`}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
