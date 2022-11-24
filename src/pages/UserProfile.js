import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  console.log("params", params);

  const { isLoading, data } = useQuery(
    ["userData", params.userId],
    () => axios.get(`https://reqres.in/api/users/${params.userId}`),
    {
      select: (res) => res.data,
      initialData: () => {
        const user = queryClient
          .getQueryData(["user-data"])
          ?.data.data.find((item) => item.id === parseInt(params.userId));

        if (user) {
          console.log("initial data", { data: user });
          return { data: { data: user } };
        } else {
          return undefined;
        }
      },
    }
  );

  console.log("user data", data && data);

  return (
    <div>
      <h1>User Profile</h1>
      <p>{data?.data.email}</p>
      <p>{data?.data.first_name}</p>
      <p>{data?.data.last_name}</p>
      <p>{data?.data.id}</p>
    </div>
  );
};

export default UserProfile;
