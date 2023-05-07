import React from "react";
import DataTable from "react-data-table-component";

const MyTable = (props) => {
  const { data, columns, title } = props;
  return (
    <div className="bg-white p-10 rounded-md shadow-md">
      <DataTable
        columns={columns}
        data={data}
        title={title || ""}
        pagination
        customStyles={{
          table: {
            zIndex: 10, // Adjust the desired z-index value here
            backgroundColor: "blue",
          },
        }}
      />
    </div>
  );
};
// cell:() => <button onClick={clickHandler} >Action</button>,
export default MyTable;
