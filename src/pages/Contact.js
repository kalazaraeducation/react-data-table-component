// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { Link } from "react-router-dom";
import { UserHookData, RandomData } from "../pages/hooks/query-hooks";

const Contact = () => {
  const { data, isLoading, isError, error, refetch } = UserHookData();
  const {
    data: randomUserData,
    isLoading: randomLoading,
    isError: randomError,
    error: randomErrorMessage,
    refetch: randomRefetch,
  } = RandomData();

  console.log("data", data && data);
  console.log("random data", randomUserData && randomUserData);

  if (isError && randomError)
    return (
      <h1>
        {error.message}
        {randomErrorMessage.message}
      </h1>
    );

  if (isLoading && randomLoading) return <h1>Loading...</h1>;

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
      <h1 className="text-xl">Query - 2</h1>
      {randomUserData?.data.map((item, i) => (
        <div key={i} className="flex gap-x-2">
          <p>{item.email}</p>
          <Link to={`/single-user-data/${item.id}`}>Profile</Link>
        </div>
      ))}
    </>
  );
};

export default Contact;
