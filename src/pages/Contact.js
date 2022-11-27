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

  if (isLoading) return <h1>Loading...</h1>;

  console.log(data && { data });

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Status",
      selector: (row) => row.status,
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
        fixedHeader={true}
        fixedHeaderScrollHeight="300px"
      />
    </>
  );
};

export default Contact;
