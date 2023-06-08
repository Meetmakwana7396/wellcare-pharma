import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ADMIN_IMG_URL, auth_code, uploadImage, URL } from "../../baseurl";
import Main from "../components/common/Main";
import MyTable from "../components/common/MyTable";
import OffCanvas from "../components/common/OffCanvas";
import { formatDate, toIndianCurrency } from "../components/helper/libs";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";

const defaultParams = {
  medicin_name: "",
  medicin_description: "",
  medicin_img_url: "",
  price: "",
  quantity: "",
  manufacture_date: "",
  expire_date: "",
  category_id: "",
  disease_id: "",
  new_pharma: false,
  company_name: "",
  company_email: "",
  company_contact_no: "",
  location: "",
  medicin_pharma_company_id: 0,
  discount: "",
};

const Products = () => {
  const [productsList, setProductsList] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [diseaseList, setDiseaseList] = useState([]);
  const [pharmaCompanyList, setPharmaCompanyList] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(defaultParams);
  const [isEdit, setIsEdit] = useState(false);

  const [profile_pic, setprofile_pic] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file)
      .then((data) => {
        // Handle successful response data
        setprofile_pic(data);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
    setProfilePic(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "new_pharma") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: e.target.checked,
      }));
      return;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function validateForm(formData) {
    const errors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (
        (key === "price" || key === "discount" || key === "quantity") &&
        value &&
        isNaN(value)
      ) {
        errors[key] = `${key} cannot be string.`;
      } else if (
        new_pharma === true &&
        (key === "company_name" ||
          key === "company_email" ||
          key === "company_contact_no" ||
          key === "location") &&
        value === ""
      ) {
        if (key === "company_contact_no" && isNaN(value)) {
          errors[key] = `${key} cannot be string.`;
        } else {
          errors[key] = "This field is required.";
        }
      } else if (
        value === "" &&
        key !== "company_name" &&
        key !== "company_email" &&
        key !== "company_contact_no" &&
        key !== "location"
      ) {
        errors[key] = "This field is required.";
      }
    }
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      setErrors(errors);
      return false;
    }
  }

  const addProduct = (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      setIsLoading(true);
      axios({
        method: "post",
        url: `${URL}api/medicin/add`,
        data: { ...formData, auth_code, medicin_img_url: profile_pic },
      })
        .then((response) => {
          toast.success(response.data.message);
          getProductsList();
          setShow(false);
          setFormData(defaultParams);
          // setIsLoading(false);
          // setProductsList(response.data.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setIsLoading(false);
        });
    } else {
      console.log(formData);
    }
  };

  const updateProductDetails = (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      setIsLoading(true);
      axios({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "put",
        url: `${URL}api/medicin/update`,
        data: { ...formData, auth_code, medicin_img_url: profile_pic },
      })
        .then((response) => {
          // toast.success(response.data.message);
          toast.success("Medicin Details Updated");

          getProductsList();
          setShow(false);
          setFormData(defaultParams);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setIsLoading(false);
        });
    }
  };

  const getProductsList = () => {
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
  };

  const getCategoryList = () => {
    axios({
      method: "get",
      url: `${URL}api/category/get?auth_code=${auth_code}`,
    })
      .then((response) => {
        setCategoryData(response.data.data);
      })
      .catch((error) => {});
  };

  const getPharmaCompany = () => {
    axios({
      method: "get",
      url: `${URL}api/pharma-company/get?auth_code=${auth_code}`,
    })
      .then((response) => {
        setPharmaCompanyList(response.data.data);
      })
      .catch((error) => {
        // setIsLoading(false);
      });
  };

  const getDiseaseList = () => {
    axios({
      method: "get",
      url: `${URL}api/disease/get?auth_code=${auth_code}`,
    })
      .then((response) => {
        setDiseaseList(response.data.data);
      })
      .catch((error) => {});
  };

  const deleteProduct = (id) => {
    axios({
      method: "delete",
      url: `${URL}api/medicin/delete?auth_code=${auth_code}&medicin_id=${id}`,
    })
      .then((response) => {
        toast.success(response.data.message);
        getProductsList();
      })
      .catch((error) => {
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    getProductsList();
    getCategoryList();
    getDiseaseList();
  }, []);

  const columns = [
    {
      name: "#",
      cell: (row) => (
        <img
          className="text-primary cursor-pointer hover:text-black rounded object-cover w-10 h-10"
          src={ADMIN_IMG_URL + row?.medicin_img_url}
        />
      ),
    },
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
      selector: (row) => toIndianCurrency(row.price.toString()),
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity_unit,
      sortable: false,
    },
    {
      name: "Expire Date",
      selector: (row) => formatDate(row.expire_date),
      sortable: false,
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            className={`text-white w-auto text-center mr-2 p-2 rounded bg-danger/80 hover:bg-danger ${
              isLoading ? "pointer-events-none opacity-30" : ""
            }`}
            onClick={() => deleteProduct(row.id)}
          >
            Delete
          </button>
          <button
            className={`text-white w-auto text-center p-2 rounded bg-warning/80 hover:bg-warning ${
              isLoading ? "pointer-events-none opacity-30" : ""
            }`}
            onClick={() => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                medicin_name: row.medicin_name,
                medicin_description: row.medicin_description,
                medicin_img_url: row.medicin_img_url,
                price: row.price,
                quantity: row?.quantity_unit,
                manufacture_date: row.manufacture_date.split("T")[0],
                expire_date: row.expire_date.split("T")[0],
                category_id: row.category?.id,
                disease_id: row.disease?.id,
                medicin_pharma_company_id: row.pharma_company?.id,
                discount: row.discount,
                medicin_id: row?.id,
              }));
              setIsEdit(true);
              setShow(true);
            }}
          >
            Edit
          </button>
        </>
      ),
    },
  ];

  return (
    <Main>
      <div className="flex justify-end">
        <button
          className="bg-primary rounded text-white py-2 px-5 mb-3"
          onClick={() => {
            setShow(true);
            getPharmaCompany();
            setFormData(defaultParams);
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
          setIsEdit(false);
        }}
      >
        <div className="py-10">
          <div className="py-4">
            <label htmlFor="category_name">Medicin Name:</label>
            <input
              type="text"
              className="form-control"
              id="medicin_name"
              name="medicin_name"
              placeholder="Enter Medicin Name"
              value={formData.medicin_name || ""}
              onChange={handleChange}
            />
            {errors?.medicin_name && (
              <p className="text-danger text-sm">{errors.medicin_name}</p>
            )}
          </div>

          <div className="py-4">
            <label htmlFor="category_name">Medicin Description:</label>
            <textarea
              type="text"
              className="form-control"
              id="medicin_description"
              name="medicin_description"
              value={formData.medicin_description || ""}
              placeholder="Enter Medicin Description"
              onChange={handleChange}
            />
            {errors?.medicin_description && (
              <p className="text-danger text-sm">
                {errors.medicin_description}
              </p>
            )}
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
                  name="medicin_img_url"
                  type="file"
                  className="sr-only"
                  // value={formData.medicin_img_url || ""}
                  onChange={handleProfilePicChange}
                />
              </label>
            </div>
            {errors?.medicin_img_url && (
              <p className="text-danger text-sm">{errors.medicin_img_url}</p>
            )}
          </div>

          <div className="py-4">
            <label htmlFor="category_name">Price:</label>
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={formData.price || ""}
              placeholder="Enter Price"
              onChange={handleChange}
            />
            {errors?.price && (
              <p className="text-danger text-sm">{errors.price}</p>
            )}
          </div>

          <div className="py-4">
            <label htmlFor="category_name">Quantity:</label>
            <input
              type="text"
              className="form-control"
              id="quantity"
              name="quantity"
              value={formData.quantity || ""}
              placeholder="Enter Quantity"
              onChange={handleChange}
            />
            {errors?.quantity && (
              <p className="text-danger text-sm">{errors.quantity}</p>
            )}
          </div>

          <div className="py-4">
            <label htmlFor="datePicker">Manufacture Date:</label>
            <input
              type="date"
              className="form-control"
              name="manufacture_date"
              id="manufacture_date"
              onChange={handleChange}
              value={formData.manufacture_date || ""}
            />
            {errors?.manufacture_date && (
              <p className="text-danger text-sm">{errors.manufacture_date}</p>
            )}
          </div>

          <div className="py-4">
            <label htmlFor="datePicker">Expire Date:</label>
            <input
              type="date"
              className="form-control"
              name="expire_date"
              id="expire_date"
              onChange={handleChange}
              value={formData.expire_date || ""}
            />
            {errors?.expire_date && (
              <p className="text-danger text-sm">{errors.expire_date}</p>
            )}
          </div>

          <div className="py-4">
            <label htmlFor="category_name">Medicin Category:</label>
            <select
              name="category_id"
              value={formData.category_id || ""}
              onChange={handleChange}
              className="form-control bg-transparent mt-1"
            >
              <option value="">Select an option</option>
              {categoryData.map((option) => (
                <option key={option?.id} value={option?.id}>
                  {option.category_name}
                </option>
              ))}
            </select>
            {errors?.category_id && (
              <p className="text-danger text-sm">{errors.category_id}</p>
            )}
          </div>

          <div className="py-4">
            <label htmlFor="category_name">Disease Name:</label>
            <select
              name="disease_id"
              value={formData.disease_id || ""}
              onChange={handleChange}
              className="form-control bg-transparent mt-1"
            >
              <option value="">Select an option</option>
              {diseaseList.map((option) => (
                <option key={option?.id} value={option?.id}>
                  {option.disease_name}
                </option>
              ))}
            </select>
            {errors?.disease_id && (
              <p className="text-danger text-sm">{errors.disease_id}</p>
            )}
          </div>

          <label for="new_pharma">
            <input
              type="checkbox"
              className="mt-3"
              name="new_pharma"
              id="new_pharma"
              onChange={handleChange}
            />
            <span className="mr-3"> New Pharma Company</span>
          </label>

          {!formData.new_pharma ? (
            <div className="py-4">
              <label htmlFor="category_name">Pharma Company:</label>
              <select
                onChange={handleChange}
                name="medicin_pharma_company_id"
                className="form-control bg-transparent mt-1"
                value={formData.medicin_pharma_company_id || ""}
              >
                <option value="">Select an option</option>
                {pharmaCompanyList.map((option) => (
                  <option key={option?.id} value={option?.id}>
                    {option.company_name}
                  </option>
                ))}
              </select>
              {errors?.medicin_pharma_company_id && (
                <p className="text-danger text-sm">
                  {errors.medicin_pharma_company_id}
                </p>
              )}
            </div>
          ) : (
            <>
              <div className="py-4">
                <label htmlFor="category_name">Company Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="company_name"
                  name="company_name"
                  placeholder="Enter Company Name"
                  onChange={handleChange}
                  value={formData.company_name || ""}
                />
                {errors?.discount && (
                  <p className="text-danger text-sm">{errors.company_name}</p>
                )}
              </div>
              <div className="py-4">
                <label htmlFor="category_name">Company Email:</label>
                <input
                  type="text"
                  className="form-control"
                  id="company_email"
                  name="company_email"
                  placeholder="Enter Company Email"
                  onChange={handleChange}
                  value={formData.company_email || ""}
                />
                {errors?.company_email && (
                  <p className="text-danger text-sm">{errors.company_email}</p>
                )}
              </div>

              <div className="py-4">
                <label htmlFor="category_name">Company Contact no:</label>
                <input
                  type="text"
                  className="form-control"
                  id="company_contact_no"
                  name="company_contact_no"
                  placeholder="Enter Company Contact no"
                  onChange={handleChange}
                  value={formData.company_contact_no || ""}
                />
                {errors?.company_contact_no && (
                  <p className="text-danger text-sm">
                    {errors.company_contact_no}
                  </p>
                )}
              </div>

              <div className="py-4">
                <label htmlFor="category_name">Location:</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  placeholder="Enter Company Location"
                  onChange={handleChange}
                  value={formData.location || ""}
                />
                {errors?.location && (
                  <p className="text-danger text-sm">{errors.location}</p>
                )}
              </div>
            </>
          )}

          <div className="py-4">
            <label htmlFor="category_name">Discount:</label>
            <input
              type="text"
              className="form-control"
              id="discount"
              name="discount"
              placeholder="Enter Quantity"
              onChange={handleChange}
              value={formData.discount || ""}
            />
            {errors?.discount && (
              <p className="text-danger text-sm">{errors.discount}</p>
            )}
          </div>

          {isEdit ? (
            <button
              className="bg-primary w-[100%] p-2 rounded text-white"
              onClick={updateProductDetails}
            >
              Update
            </button>
          ) : (
            <button
              className="bg-primary w-[100%] p-2 rounded text-white"
              onClick={addProduct}
            >
              Add Product
            </button>
          )}
        </div>
      </OffCanvas>
    </Main>
  );
};

export default Products;
