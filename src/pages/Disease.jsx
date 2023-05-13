import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { auth_code, URL } from "../../baseurl";
import Loader from "../components/common/Loader";
import Main from "../components/common/Main";
import MyTable from "../components/common/MyTable";
import OffCanvas from "../components/common/OffCanvas";

const Disease = () => {
  const [show, setShow] = useState(false);
  const [diseaseData, setDiseaseData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [diseaseName, setDiseaseName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    if (diseaseName === "") {
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
        url: `${URL}api/disease/add`,
        data: {
          auth_code,
          disease_name: diseaseName,
        },
      })
        .then((response) => {
          setIsLoading(false);
          toast.success(response.data.message);
          getDiseaseList();
          setDiseaseName("");
          setShow(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  const getDiseaseList = () => {
    axios({
      method: "get",
      url: `${URL}api/disease/get?auth_code=${auth_code}`,
    })
      .then((response) => {
        setDiseaseData(response.data.data);
      })
      .catch((error) => {});
  };

  const deleteCategory = async (id) => {
    await axios({
      method: "delete",
      url: `${URL}api/disease/delete`,
      data: {
        dis_id: parseInt(id),
        auth_code,
      },
    })
      .then((response) => {
        toast.success(response.data.message);
        getDiseaseList();
      })
      .catch((error) => {});
  };

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Category Name",
      selector: (row) => row.disease_name,
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
          Delete
        </button>
      ),
    },
  ];

  useEffect(() => {
    getDiseaseList();
  }, [getDiseaseList]);
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
      <MyTable title="Diseases" data={diseaseData} columns={columns} />
      <OffCanvas
        isOpen={show}
        title="Add New Disease"
        onClose={() => {
          setShow(false);
        }}
      >
        <div className="py-10">
          <label htmlFor="category_name">Disease Name:</label>
          <input
            type="text"
            className="form-control mt-2"
            id="category_name"
            value={diseaseName}
            placeholder="Enter Disease Name"
            onChange={(e) => setDiseaseName(e.target.value)}
          />
          {hasError ? (
            <span className="text-danger text-sm font-semibold">Required</span>
          ) : (
            ""
          )}
          <div className="flex justify-end">
            <button
              className="bg-primary rounded text-white mt-7 py-2 px-5 w-[100px] mb-3"
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

export default Disease;
