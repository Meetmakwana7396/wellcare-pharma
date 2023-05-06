import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiLoader } from "react-icons/bi";
import Loader from "../components/common/Loader";
import { auth_code, URL } from "../../baseurl";
import Main from "../components/common/Main";
import MyTable from "../components/common/MyTable";
import OffCanvas from "../components/common/OffCanvas";

const Stores = () => {
  const [storeData, setStoreData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  
  const verifyStore = async (id) => {
    setIsLoading(true);
    await axios({
      method: "post",
      url: `${URL}api/verify-store`,
      data: {
        auth_code,
        store_id: id,
      },
    })
      .then((response) => {
        setIsLoading(false);
        toast.success(response.data.message);
        getStoreData();
      })
      .catch((error) => {
        setIsLoading(false);

      });
  };

  const columns = [
    {
      name: "Username",
      selector: (row) => row.user_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Contact No",
      selector: (row) => row.contact_number,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Area",
      selector: (row) => row.area,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "State",
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: "Pincode",
      selector: (row) => row.pincode,
    },
    {
      name: "Action",
      cell: (row) =>
        row.is_confirm ? (
          <button className="text-white p-2 rounded bg-secondary" disabled>
            Verified
          </button>
        ) : (
          <button
            className={`text-white w-[64px] text-center py-2 rounded bg-primary ${
              isLoading ? "pointer-events-none opacity-30" : ""
            }`}
            onClick={() => verifyStore(row.id)}
          >
            {isLoading ? <Loader /> : "Verify"}
          </button>
        ),
    },
  ];
  const getStoreData = async () => {
    await axios({
      method: "get",
      url: `${URL}api/get-stores?auth_code=${auth_code}`,
    })
      .then((response) => {
        setStoreData(response.data.data);
      })
      .catch((error) => {
      });
  };
  useEffect(() => {
    getStoreData();
  }, []);

  return (
    <Main>
      <MyTable data={storeData} columns={columns} title="Stores Details" />
    </Main>
  );
};

export default Stores;
