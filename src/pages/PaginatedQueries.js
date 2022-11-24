import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const PaginatedQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, isError, error } = useQuery(
    ["randomData", pageNumber],
    () => axios.get(`https://reqres.in/api/users/?page=${pageNumber}`),
    {
      enabled: !!pageNumber,
      select: (res) => res.data,
      keepPreviousData: true,
    }
  );

  if (isError) return <h1>{error.message}</h1>;

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <h1 className="text-xl">Current Page - {pageNumber}</h1>

      {data?.data.map((item, i) => (
        <div key={i} className="flex gap-x-2">
          <p>{item.email}</p>
          <Link to={`/single-user-data/${item.id}`}>Profile</Link>
        </div>
      ))}

      <div className="flex gap-x-2">
        <button
          onClick={() => {
            setPageNumber((page) => page - 1);
          }}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <button
          onClick={() => {
            setPageNumber((page) => page + 1);
          }}
          disabled={pageNumber === 4}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PaginatedQueries;
