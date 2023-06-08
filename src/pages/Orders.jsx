import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Main from "../components/common/Main";
import { ADMIN_IMG_URL, auth_code, URL } from "../../baseurl";
import MyTable from "../components/common/MyTable";
import { useEffect } from "react";
import {
  formatDate,
  getOrderStatus,
  toIndianCurrency,
} from "../components/helper/libs";
import { toast } from "react-hot-toast";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateStatus = (id) => {
    axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("store_token")}`,
      },
      method: "put",
      url: `${URL}api/shop-order/delivere?order_id=${id}&auth_code=${auth_code}`,
    })
      .then((response) => {
        toast.success(response.data.message);
        getOrders();
      })
      .catch((error) => {
        console.log(error, "kkooll");
      });
  };

  const getOrders = () => {
    setIsLoading(true);
    axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("store_token")}`,
      },
      method: "get",
      url: `${URL}api/shop-order/get?auth_code=${auth_code}`,
    })
      .then((response) => {
        setOrders(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error, "kkooll");
      });
  };

  const columns = [
    {
      name: "#",
      cell: (row) => (
        <img
          className="text-primary cursor-pointer rounded hover:text-black object-cover w-10 h-10"
          src={ADMIN_IMG_URL + row?.medicin?.medicin_img_url}
        />
      ),
    },
    {
      name: "id",
      cell: (row) => (
        <span
          className="text-primary cursor-pointer hover:text-black font-semibold w-full"
          onClick={() =>
            navigate("/orders/admin-order-details", { state: { data: row } })
          }
        >
          {row?.id}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Medicin Name",
      cell: (row) => row?.medicin?.medicin_name,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row?.user?.user_name,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row?.quantity,
    },

    {
      name: "Order Date",
      selector: (row) => formatDate(row?.createdAt),
      sortable: "true",
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`${
            row?.delivered
              ? "bg-black/50 p-2 rounded text-white pointer-events-none opacity-50"
              : "bg-primary cursor-pointer p-2 rounded text-white"
          }`}
          onClick={() => updateStatus(row.id)}
        >
          {row?.delivered ? "Delivered" : "Mark Delivered"}
        </span>
      ),
    },
  ];

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <Main>
      <MyTable
        title="Store Orders"
        data={orders}
        columns={columns}
        isLoading={isLoading}
      />
    </Main>
  );
};

export default Orders;
