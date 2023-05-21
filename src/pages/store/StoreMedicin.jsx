import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { auth_code, URL } from "../../../baseurl";
import Loader from "../../components/common/Loader";
import StoreMain from "../../components/common/store/StoreMain";
import MyTable from "../../components/common/MyTable";
import OffCanvas from "../../components/common/OffCanvas";
import { formatDate } from "../../components/helper/libs";
import { Link } from "react-router-dom";

const StoreMedicin = () => {
  const defaultParams = {
    quantity: "",
    storeCommission: "",
  };
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(defaultParams);
  const [medicinList, setMedicinList] = useState([]);
  const [errors, setErrors] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const [medicinId, setMedicinId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const fields = ["quantity", "storeCommission"]; // Add more field names if needed
    const errors = {};

    for (const field of fields) {
      if (formData[field].trim() === "") {
        errors[field] = "Field cannot be empty";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length > 0 ? false : true;
  };

  const getMedicinList = () => {
    axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("store_token")}`,
      },
      method: "get",
      url: `${URL}store/medicin/get`,
    })
      .then((response) => {
        setMedicinList(response.data.data);
      })
      .catch((error) => {
        console.log(error, "kkooll");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const regex = /^[0-9\b]+$/; // Regex to allow only numbers

    if (value === "" || regex.test(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const addMedicin = (e) => {
    e.preventDefault();
    // Perform your submit logic here using the formData
    if (validate()) {
      axios({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("store_token")}`,
        },
        method: "post",
        url: `${URL}store/medicin/add`,
        data: { ...formData, medicin_id: medicinId },
      })
        .then((response) => {
          toast.success(response?.data?.message);
          setFormData(defaultParams);
          getMedicinList();
          setShow(false);
        })
        .catch((error) => {
          console.log(error, "kkooll");
        });
    }
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
          to={`/store-medicins/${row.id}`}
          className="text-primary font-semibold hover:underline"
        >
          {row.medicin_name}
        </Link>
      ),
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity_unit,
    },
    {
      name: "Expire Date",
      selector: (row) => formatDate(row.expire_date),
    },

    {
      name: "Action",
      cell: (row) => (
        <button
          className={`text-white px-2 text-center py-2 rounded bg-success font-semibold`}
          onClick={() => {
            setMedicinId(row.id);
            setShow(true);
          }}
        >
          Purchase
        </button>
      ),
    },
  ];

  useEffect(() => {
    getMedicinList();
  }, []);
  return (
    <StoreMain>
      <MyTable title="Medicins" data={medicinList} columns={columns} />
      <OffCanvas
        isOpen={show}
        title="Purchase Medicin"
        onClose={() => {
          setShow(false);
        }}
      >
        <div className="py-5">
          <div className="mb-5">
            <label htmlFor="quantity">Quantity:</label>
            <input
              id="quantity"
              type="text"
              name="quantity"
              placeholder="Enter Quantity"
              className="form-control"
              onChange={handleChange}
              value={formData.quantity}
            />
            {errors.quantity && (
              <span className="text-danger text-sm font-semibold">
                {errors.quantity}
              </span>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="storeCommission">Store Commission:</label>
            <input
              id="storeCommission"
              type="text"
              name="storeCommission"
              placeholder="Enter commission in number"
              className="form-control"
              onChange={handleChange}
              value={formData.storeCommission}
            />
            {errors.storeCommission && (
              <span className="text-danger text-sm font-semibold">
                {errors.storeCommission}
              </span>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn bg-success font-semibold rounded p-2 text-white"
              onClick={addMedicin}
            >
              Submit
            </button>
          </div>
        </div>
      </OffCanvas>
    </StoreMain>
  );
};

export default StoreMedicin;
