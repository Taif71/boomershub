import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "library";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<IUser, { data: Partial<IUser> }>({
      query: ({ data }) => ({
        url: "",
        method: "post",
        body: data,
      }),
      transformResponse: (result: any) => result?.data,
      invalidatesTags: (result): any => [{ type: "user" }],
    }),
  }),
});

export const { useCreateUserMutation } = userApi;
