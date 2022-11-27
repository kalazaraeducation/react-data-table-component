import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DataTable from "react-data-table-component";

const Contact = () => {
  const { data, isLoading, isError, error } = useQuery(
    ["user-data"],
    () => axios.get("https://gorest.co.in/public/v1/users"),
    {
      select: (res) => res.data,
    }
  );

  if (isError) return <h1>{error.message}</h1>;

  // if (isLoading) return <h1>Loading...</h1>;

  console.log(data && { data });

  const customSortFunction = (rowA, rowB) => {
    const a = rowA.name.toLowerCase();
    const b = rowB.name.toLowerCase();

    console.log({ a, b });

    if (a > b) {
      return 1;
    }

    if (b > a) {
      return -1;
    }

    return 0;
  };

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
      sortFunction: customSortFunction,
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

  return (
    <>
      <h1 className="text-xl">Query - 1</h1>

      <DataTable
        columns={columns}
        data={tableData}
        progressPending={isLoading}
        progressComponent={<h1>My Custom Component</h1>}
        defaultSortFieldId={1}
      />
    </>
  );
};

export default Contact;
