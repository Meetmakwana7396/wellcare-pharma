import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { auth_code, URL } from "../../baseurl";
import Main from "../components/common/Main";
import MyTable from "../components/common/MyTable";
import OffCanvas from "../components/common/OffCanvas";
import { formatDate } from "../components/helper/libs";
import "react-datepicker/dist/react-datepicker.css";

const Products = () => {
  const [productsList, setProductsList] = useState([]);
  const [pharmaCompanyList, setPharmaCompanyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const getProductsList = useCallback(() => {
    setIsLoading(true);
    axios({
      method: "get",
      url: `${URL}api/medicin/get?auth_code=${auth_code}`,
    })
      .then((response) => {
        setIsLoading(false);
        setProductsList(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [URL, auth_code]);

  const getPharmaCompany = () => {
    axios({
      method: "get",
      url: `${URL}api/pharma-company/get?auth_code=${auth_code}`,
    })
      .then((response) => {
        console.log(response.data.data);
        setPharmaCompanyList(response.data.data);
      })
      .catch((error) => {
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    getProductsList();
  }, [getProductsList]);

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Medicin Name",
      selector: (row) => row.medicin_name,
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
      sortable: false,
    },
    {
      name: "Manufacture Date",
      selector: (row) => formatDate(row.manufacture_date),
      sortable: false,
    },

    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <button
    //       className={`text-white w-[64px] text-center py-2 rounded bg-danger ${
    //         isLoading ? "pointer-events-none opacity-30" : ""
    //       }`}
    //       onClick={() => deleteCategory(row.id)}
    //     >
    //       {isLoading ? <Loader /> : "Delete"}
    //     </button>
    //   ),
    // },
  ];

  return (
    <Main>
      <div className="flex justify-end">
        <button
          className="bg-primary rounded text-white py-2 px-5 mb-3"
          onClick={() => {
            setShow(true);
            getPharmaCompany();
          }}
        >
          Add
        </button>
      </div>

      <MyTable
        title="Products"
        columns={columns}
        data={productsList}
        isLoading={isLoading}
      />

      <OffCanvas
        title="Add Products"
        isOpen={show}
        onClose={() => {
          setShow(false);
        }}
      >
        <div className="py-10">
          <div className="py-4">
            <label htmlFor="category_name">Medicin Name:</label>
            <input
              type="text"
              className="form-control mt-1"
              id="medicin_name"
              // value={categoryName}
              placeholder="Enter New Category"
              // onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="py-4">
            <label htmlFor="category_name">Medicin Description:</label>
            <textarea
              type="text"
              className="form-control mt-1"
              id="medicin_description"
              // value={categoryName}
              placeholder="Enter New Category"
              // onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="relative">
            <label htmlFor="upload" className="block">
              Medicin Image
            </label>
            <div className="mt-1 flex justify-center items-center">
              <label
                htmlFor="upload"
                className="relative w-[100%] border text-center text-black/40 cursor-pointer form-control"
              >
                <span>Upload Image</span>
                <input
                  id="upload"
                  name="upload"
                  type="file"
                  className="sr-only"
                  // onChange={handleFileUpload}
                />
              </label>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              This will upload your file to our servers.
            </p>
          </div>

          <div className="py-4">
            <label htmlFor="category_name">Price:</label>
            <input
              type="text"
              className="form-control mt-1"
              id="medicin_description"
              // value={categoryName}
              placeholder="Enter Price"
              // onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="py-4">
            <label htmlFor="category_name">Quantity:</label>
            <input
              type="text"
              className="form-control mt-1"
              id="medicin_description"
              // value={categoryName}
              placeholder="Enter Quantity"
              // onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="py-4">
            <label htmlFor="datePicker">Manufacture Date:</label>
            <DatePicker
              id="datePicker"
              // selected={selectedDate}
              // onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
              className="form-control"
            />
            {/* {selectedDate && (
                <p>Selected Date: {selectedDate.toISOString().slice(0, 10)}</p>
              )} */}
          </div>

          <div className="py-4">
            <label htmlFor="datePicker">Expire Date:</label>
            <DatePicker
              id="datePicker"
              // selected={selectedDate}
              // onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
              className="form-control"
            />
            {/* {selectedDate && (
                <p>Selected Date: {selectedDate.toISOString().slice(0, 10)}</p>
              )} */}
          </div>
          <div className="py-4">
            <label htmlFor="datePicker">Expire Date:</label>
            <DatePicker
              id="datePicker"
              // selected={selectedDate}
              // onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
              className="form-control"
            />
            {/* {selectedDate && (
                <p>Selected Date: {selectedDate.toISOString().slice(0, 10)}</p>
              )} */}
          </div>
          <div className="py-4">
            <label htmlFor="category_name">Pharma Company:</label>
            <select
              // value={selectedOption}
              // onChange={(e) => handleSelect(e.target.value)}
              className="form-control bg-transparent mt-1"
            >
              <option value="">Select an option</option>
              {pharmaCompanyList.map((option) => (
                <option key={option?.id} value={option?.company_name}>
                  {option.company_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </OffCanvas>
    </Main>
  );
};

export default Products;
