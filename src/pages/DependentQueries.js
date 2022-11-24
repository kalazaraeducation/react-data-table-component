import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserHookData } from "../pages/hooks/query-hooks";

const DependentQueries = () => {
  const { data, isLoading, isError, error, refetch } = UserHookData();

  const pageNumber = 2;

  const { data: randomUserData } = useQuery(
    ["randomData", pageNumber],
    () => axios.get(`https://reqres.in/api/users/?page=${pageNumber}`),
    {
      enabled: !!pageNumber,
      select: (res) => res.data,
    }
  );

  console.log("data", data && data);
  console.log("reandom user data", randomUserData && randomUserData);

  if (isError) return <h1>{error.message}</h1>;

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <h1 className="text-xl">Query - 1</h1>
      <button onClick={refetch}>Fetch</button>
      {data?.data.map((item, i) => (
        <div key={i} className="flex gap-x-2">
          <p>{item.email}</p>
          <Link to={`/single-user-data/${item.id}`}>Profile</Link>
        </div>
      ))}
    </>
  );
};

export default DependentQueries;
