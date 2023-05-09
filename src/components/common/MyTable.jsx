import React from "react";
import DataTable from "react-data-table-component";

const MyTable = (props) => {
  const { data, columns, title, isLoading } = props;
  return (
    <div className="bg-white p-10 rounded-md shadow-md">
      <DataTable
        columns={columns}
        data={data}
        title={title || ""}
        progressPending={isLoading || false}
        pagination
        customStyles={{
          table: {
            zIndex: 10, // Adjust the desired z-index value here
            backgroundColor: "blue",
          },
          headCells: {
            style: {
              fontSize:"15px",
              fontWeight: 600, // Set the font-weight to 800 (bold)
            },
          },
        }}
      />
    </div>
  );
};
// cell:() => <button onClick={clickHandler} >Action</button>,
export default MyTable;
