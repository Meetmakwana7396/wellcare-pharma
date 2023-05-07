import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { auth_code, URL } from "../../baseurl";
import Main from "../components/common/Main";
import MyTable from "../components/common/MyTable";

const Users = () => {
  const [userData, setUserData] = useState([]);
  
  const getUserData = async () => {
    await axios({
      method: "get",
      url: `${URL}api/get-users?auth_code=${auth_code}`,
    })
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((error) => {});
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

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Main>
      <MyTable data={userData} columns={columns} title="Users Details" />
    </Main>
  );
};

export default Users;
