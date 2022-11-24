import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const InfiniteQueries = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["i-data"],
      ({ pageParam = 1 }) =>
        axios.get(`https://reqres.in/api/users/?page=${pageParam}`),
      {
        getNextPageParam: (lastPage, pages) => {
          console.log({ lastPage, pages });
          if (pages.length < lastPage.data.total_pages) {
            return pages.length + 1;
          } else {
            return undefined;
          }
        },
      }
    );

  console.log({ data });

  return (
    <>
      <h1 className="text-xl">Current Page</h1>
      {data?.pages.map((page, j) => (
        <Fragment key={j}>
          {page.data.data.map((item, i) => (
            <div key={i} className="flex gap-x-2">
              <p>{item.email}</p>
              <Link to={`/single-user-data/${item.id}`}>Profile</Link>
            </div>
          ))}
        </Fragment>
      ))}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        Load More
      </button>
    </>
  );
};

export default InfiniteQueries;
