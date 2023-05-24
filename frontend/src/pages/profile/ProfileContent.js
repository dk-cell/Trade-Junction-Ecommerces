import React, { useState } from "react";
import { backendUrl } from "../../constant";
import { useSelector } from "react-redux";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import styles from "../../style/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { MdOutlineTrackChanges } from "react-icons/md";
const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhone] = useState();
  const [pincode, setPincode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backendUrl}${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132] "
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full md:flex block pb-3">
                <div className="w-[100%] md:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-2 md:mb-0`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="w-[100%] md:w-[50%]">
                  <label className="block pb-2">Email</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 md:mb-0`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="w-full md:flex block pb-3">
              <div className="w-[100%] md:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="tel"
                    className={`${styles.input} !w-[95%] mb-3 md:mb-0`}
                    value={phoneNumber}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="w-[100%] md:w-[50%]">
                  <label className="block pb-2">Pincode</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-0 md:mb-0`}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="w-full md:flex block pb-3">
              <div className="w-[100%] md:w-[50%]">
                  <label className="block pb-2">Address 1</label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%] mb-3 md:mb-0`}
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    required
                  />
                </div>

                <div className="w-[100%] md:w-[50%]">
                  <label className="block pb-2">Address 2</label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    required
                  />
                </div>
              </div>
              <input
                className="w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer"
                value="update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {active === 2 && (
        <div>
          <RenderAllOrder />
        </div>
      )}

      {active === 3 && (
        <div>
          <RenderAllRefundOrder />
        </div>
      )}

      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {active === 6 && (
        <div>
          <PaymentMethods />
        </div>
      )}

{active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const RenderAllOrder = () => {
  const params = useParams();
  const orders = [
    {
      _id: "jaksdkfashkfjsh",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      //   cellClassName: (params) => {
      //     return params.getValue(params.id, "status") === "Delivered"
      //       ? "greenColor"
      //       : "redColor";
      //   },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.orderItems?.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const RenderAllRefundOrder = () => {
  const params = useParams();
  const orders = [
    {
      _id: "refundallorder",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      //   cellClassName: (params) => {
      //     return params.getValue(params.id, "status") === "Delivered"
      //       ? "greenColor"
      //       : "redColor";
      //   },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.orderItems?.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrder = () => {
  const params = useParams();
  const orders = [
    {
      _id: "refundallorder",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      //   cellClassName: (params) => {
      //     return params.getValue(params.id, "status") === "Delivered"
      //       ? "greenColor"
      //       : "redColor";
      //   },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.orderItems?.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const PaymentMethods = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Payment Methods
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add new</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img src="" alt="" />
          <h5 className="pl-5 font-[600]">Deepak Singh</h5>
        </div>

        <div className="pl-5 flex items-center">
          <h5 className="pl-5 ">1235 **** **** ****</h5>
        </div>

        <div className="pl-5 flex items-center">
          <h5 className="pl-5">02/2029</h5>
        </div>

        <div className="pl-5 flex items-center">
         <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const Address = () => {
    return (
      <div className="w-full px-5">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
           Address
          </h1>
          <div className={`${styles.button} !rounded-md`}>
            <span className="text-[#fff]">Add new</span>
          </div>
        </div>
        <br />
        <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
          <div className="flex items-center">
            <img src="" alt="" />
            <h5 className="pl-5 font-[600]">Default</h5>
          </div>
  
          <div className="pl-5 flex items-center">
            <h5 className="pl-5 ">123 kotwali jaunpur up</h5>
          </div>
  
          <div className="pl-5 flex items-center">
            <h5 className="pl-5">{+91} 3715236459</h5>
          </div>
  
          <div className="pl-5 flex items-center">
           <AiOutlineDelete size={25} className="cursor-pointer" />
          </div>
        </div>
      </div>
    );
  };

export default ProfileContent;
