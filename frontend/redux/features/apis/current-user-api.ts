import { decrypt } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "library";

const tags = {
  currentUser: "current_user",
};
export const currentUserApi = createApi({
  reducerPath: "currentUserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api`,
    credentials: "include",
  }),
  tagTypes: [tags.currentUser],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<
      { authorization: string; "current-user": IUser; error: string, school: string },
      void
    >({
      query: () => ({ url: "/cookie" }),
      transformResponse: async ({ data }: any) => {
        const userId = decrypt(data["current-user"])._id;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${userId}`,
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const res = await response.json();
          return {"current-user": res.data, authorization: data["authorization"], school: data['school']};
        } else {
          data["current-user"] = null;
          data["authorization"] = null;
          data['school'] = null;
          data["error"] =
            (await response.json())?.message || "Something went wrong";
        }
        return data;
      },
      providesTags: (result, err, arg) => (!err && [tags.currentUser]) || [],
    }),
    updateCurrentUser: builder.mutation<void, IUser>({
      query: (user) => ({
        url: `/user/${user._id}`,
        method: "patch",
        body: user,
      }),
      invalidatesTags: [tags.currentUser],
    }),
  }),
});

export const { useGetCurrentUserQuery, useUpdateCurrentUserMutation } =
  currentUserApi;
export const currentUser = currentUserApi.endpoints.getCurrentUser.select;
