import axios from "axios";
import React, { useEffect, useState } from "react";
import { auth_code, URL } from "../../baseurl";
import Main from "../components/common/Main";
import MyTable from "../components/common/MyTable";

const Stores = () => {
  const [storeData, setStoreData] = useState([]);
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
  ];
  const getStoreData = async () => {
    await axios({
      method: "get",
      url: `${URL}api/get-stores?auth_code=${auth_code}`,
    })
      .then((response) => {
        // console.log(response.data.data);
        setStoreData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
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
