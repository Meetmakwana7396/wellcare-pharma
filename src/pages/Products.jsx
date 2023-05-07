import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { auth_code, URL } from "../../baseurl";
import Main from "../components/common/Main";
import MyTable from "../components/common/MyTable";

const Products = () => {
  const [productsList, setProductsList] = useState([]);
  const getProductsList = useCallback(async () => {
    await axios({
      method: "get",
      url: `${URL}api/medicin/get?auth_code=${auth_code}`,
    })
      .then((response) => {
        setProductsList(response.data.data);
      })
      .catch((error) => {});
  }, [URL, auth_code]);

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
      name: "Description",
      selector: (row) => {
        const description = row.medicin_description;
        const words = description.split(" ");
        const limitedText = words.slice(0, 4).join(" ");
        const ellipsis = words.length > 4 ? "..." : "";
        return `${limitedText}${ellipsis}`;
      },
      sortable: true,
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
      <MyTable title="Products" columns={columns} data={productsList} />
    </Main>
  );
};

export default Products;
