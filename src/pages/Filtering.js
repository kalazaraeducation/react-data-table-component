import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import DataTable from "react-data-table-component";

const Filtering = () => {
  const [filterText, setFilterText] = useState("");

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
      id: 2,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
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

  const tableData = data?.data
    .filter(
      (item) =>
        item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
    )
    .map((user) => {
      return {
        id: user.id,
        name: user.name,
        gender: user.gender,
        status: user.status,
      };
    });

  const handleClear = () => {
    if (filterText) {
      setFilterText("");
    }
  };

  return (
    <>
      <h1 className="text-xl">Query - 1</h1>

      <div className="w-3/12 m-auto my-4">
        <div className="flex justify-center items-center">
          <input
            type="input"
            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Search"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <button
            className="btn px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
            type="button"
            onClick={handleClear}
          >
            X
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={tableData}
        progressPending={isLoading}
        progressComponent={<h1>My Custom Component</h1>}
        pagination
        highlightOnHover
        pointerOnHover
        theme={2 === 1 ? "dark" : "default"}
        // dense
      />
    </>
  );
};

export default Filtering;
