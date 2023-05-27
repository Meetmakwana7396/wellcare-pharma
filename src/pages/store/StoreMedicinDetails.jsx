import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../../../baseurl";
import StoreMain from "../../components/common/store/StoreMain";
import { formatDate } from "../../components/helper/libs";
import { useParams } from "react-router-dom";

const StoreMedicinDetails = () => {
  const [medicinDetails, setMedicinDetails] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const params = useParams();
  const { medID } = params;

  const getMedicinDetails = () => {
    axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("store_token")}`,
      },
      method: "get",
      url: `${URL}store/medicin/medicin-detail?medicin_id=${medID}`,
    })
      .then((response) => {
        console.log(response.data.data);
        setMedicinDetails(response.data.data);
      })
      .catch((error) => {
        console.log(error, "kkooll");
      });
  };

  useEffect(() => {
    getMedicinDetails();
  }, []);
  return (
    <StoreMain>
      {/* <MyTable title="Medicins" data={medicinList} columns={columns} /> */}
      <h1 className="text-2xl font-semibold mb-5 ml-4">Medicin Details</h1>
      <div className="grid grid-cols-4 gap-6 p-4">
        <div>
          <h2 className="text-lg font-semibold">Name</h2>
          <p className="text-gray-500">{medicinDetails?.medicin_name}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Category</h2>
          <p className="text-gray-500">
            {medicinDetails?.category?.category_name}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Manufacture Date</h2>
          <p className="text-gray-500">
            {medicinDetails?.manufacture_date &&
              formatDate(medicinDetails?.manufacture_date)}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Expire Date</h2>
          <p className="text-gray-500">
            {medicinDetails?.manufacture_date &&
              formatDate(medicinDetails?.expire_date)}{" "}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Price</h2>
          <p className="text-gray-500">
            {medicinDetails?.price && medicinDetails?.price}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Quantity</h2>
          <p className="text-gray-500">
            {medicinDetails?.quantity_unit && medicinDetails?.quantity_unit}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Discount</h2>
          <p className="text-gray-500">
            {medicinDetails?.discount && medicinDetails?.discount}%
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Disease</h2>
          <p className="text-gray-500">
            {medicinDetails?.disease?.disease_name &&
              medicinDetails?.disease?.disease_name}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Pharma Company</h2>
          <p className="text-gray-500">
            {medicinDetails?.pharma_company?.company_name &&
              medicinDetails?.pharma_company?.company_name}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 p-4 mt-5">
        <div className="col-span-2">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="text-gray-500">
            {medicinDetails?.medicin_description &&
              medicinDetails?.medicin_description}
          </p>
        </div>
      </div>
    </StoreMain>
  );
};

export default StoreMedicinDetails;
