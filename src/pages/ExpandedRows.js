import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DataTable from "react-data-table-component";

const ExpandedRows = () => {
  const { data, isLoading, isError, error } = useQuery(
    ["user-data"],
    () => axios.get("https://gorest.co.in/public/v1/users?page=1&per_page=100"),
    {
      select: (res) => res.data,
    }
  );

  if (isError) return <h1>{error.message}</h1>;

  console.log(data && { data });

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      sortField: "id",
      id: 2,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      sortField: "name",
      // sortFunction: customSortFunction,
      id: 1,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      id: 3,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      id: 4,
    },
  ];

  const tableData = data?.data.map((user) => {
    return {
      id: user.id,
      name: user.name,
      gender: user.gender,
      status: user.status,
    };
  });

  // const ExpandedComponent = ({ data }) => (
  //   <pre>{JSON.stringify(data, null, 2)}</pre>
  // );

  // const rowDisabled = (row) => {
  //   if (row.status === "active") {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // const rowExpanded = (row) => {
  //   if (row.status === "active") {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  return (
    <>
      <h1 className="text-xl">Query - 1</h1>
      <DataTable
        columns={columns}
        data={tableData}
        progressPending={isLoading}
        progressComponent={<h1>My Custom Component</h1>}
        pagination
        // expandableRows
        // expandableRowsComponent={ExpandedComponent}
        // expandableRowExpanded={rowExpanded}
        // expandableRowDisabled={rowDisabled}
      />
    </>
  );
};

export default ExpandedRows;
