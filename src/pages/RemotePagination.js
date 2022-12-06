import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import DataTable from "react-data-table-component";

const RemotePagination = () => {
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading } = useQuery(
    ["user-data", page, perPage],
    () =>
      axios.get(
        `https://gorest.co.in/public/v1/users?page=${page}&per_page=${perPage}`
      ),
    {
      select: (res) => res.data,
      onSuccess: (data) => {
        setTotalRows(data.meta.pagination.total);
      },
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

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

  const tableData = data?.data.map((user) => {
    return {
      id: user.id,
      name: user.name,
      gender: user.gender,
      status: user.status,
    };
  });

  const handlePerRowsChange = (newPerPage) => {
    setPerPage(newPerPage);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <h1 className="text-xl">Query - 1</h1>
      <DataTable
        columns={columns}
        data={tableData}
        progressPending={isLoading}
        progressComponent={<h1>My Custom Component</h1>}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </>
  );
};

export default RemotePagination;
