import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL } from "../../../baseurl";
import MyTable from "../../components/common/MyTable";
import StoreMain from "../../components/common/store/StoreMain";
import { formatDate } from "../../components/helper/libs";

const StoreOwnMedicin = () => {
  const [ownMedicinList, setOwnMedicinList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getOwnMedicinList = () => {
    setIsLoading(true);
    axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("store_token")}`,
      },
      method: "get",
      url: `${URL}store/medicin/purchase-medicin`,
    })
      .then((response) => {
        setOwnMedicinList(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error, "kkooll");
      });
  };

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Medicin Name",
      cell: (row) => (
        <Link
          to={`/store-medicins/${row.medicin_id}`}
          className="text-primary font-semibold hover:underline"
        >
          {row?.medicin?.medicin_name}
        </Link>
      ),
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row?.medicin?.price,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
    },
    {
      name: "Expire Date",
      selector: (row) => formatDate(row?.medicin?.expire_date),
    },
  ];

  useEffect(() => {
    getOwnMedicinList();
  }, []);

  return (
    <StoreMain>
      <MyTable
        title="My Medicins"
        data={ownMedicinList}
        columns={columns}
        isLoading={isLoading}
      />
    </StoreMain>
  );
};

export default StoreOwnMedicin;
