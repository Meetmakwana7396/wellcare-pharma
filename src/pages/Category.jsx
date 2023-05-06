import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { auth_code, URL } from "../../baseurl";
import Loader from "../components/common/Loader";
import Main from "../components/common/Main";
import MyTable from "../components/common/MyTable";
import OffCanvas from "../components/common/OffCanvas";

const Category = () => {
  const [show, setShow] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    if (categoryName === "") {
      setHasError(true);
      isValid = false;
    } else {
      setHasError(false);
    }
    return isValid;
  };

  const handleAdd = async () => {
    if (validate()) {
      setIsLoading(true);
      await axios({
        method: "post",
        url: `${URL}api/category/add`,
        data: {
          auth_code,
          category_name: categoryName,
        },
      })
        .then((response) => {
          setIsLoading(false);
          toast.success(response.data.message);
          getCategoryList();
          setCategoryName("");
          setShow(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  const getCategoryList = useCallback(async () => {
    await axios({
      method: "get",
      url: `${URL}api/category/get?auth_code=${auth_code}`,
    })
      .then((response) => {
        setCategoryData(response.data.data);
      })
      .catch((error) => {
      });
  }, [URL, auth_code]);

  const deleteCategory = async (id) => {
    await axios({
      method: "delete",
      url: `${URL}api/category/delete`,
      data: {
        cat_id: parseInt(id),
        auth_code,
      },
    })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
      });
  };

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Category Name",
      selector: (row) => row.category_name,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className={`text-white w-[64px] text-center py-2 rounded bg-danger ${
            isLoading ? "pointer-events-none opacity-30" : ""
          }`}
          onClick={() => deleteCategory(row.id)}
        >
          {isLoading ? <Loader /> : "Delete"}
        </button>
      ),
    },
  ];

  useEffect(() => {
    getCategoryList();
  }, [getCategoryList]);
  return (
    <Main>
      <div className="flex justify-end">
        <button
          className="bg-primary rounded text-white py-2 px-5 mb-3"
          onClick={() => setShow(true)}
        >
          Add
        </button>
      </div>
      <MyTable title="Categories" data={categoryData} columns={columns} />
      <OffCanvas
        isOpen={show}
        title="Add New Category"
        onClose={() => {
          setShow(false);
        }}
      >
        <div className="py-10">
          <label htmlFor="category_name">Category Name:</label>
          <input
            type="text"
            className="form-control mt-2"
            id="category_name"
            value={categoryName}
            placeholder="Enter New Category"
            onChange={(e) => setCategoryName(e.target.value)}
          />
          {hasError ? (
            <span className="text-danger text-sm font-semibold">Required</span>
          ) : (
            ""
          )}
          <div className="flex justify-end">
            <button
              className="bg-primary rounded text-white mt-10 py-2 px-5 w-[100px] mb-3"
              onClick={handleAdd}
            >
              {isLoading ? <Loader /> : "Add"}
            </button>
          </div>
        </div>
      </OffCanvas>
    </Main>
  );
};

export default Category;
