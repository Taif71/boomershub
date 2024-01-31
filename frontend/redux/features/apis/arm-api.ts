import { transformErrorResponse, transformResponse } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IArm } from "library";

export const armApi = createApi({
  reducerPath: "armApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/arms`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createArm: builder.mutation<IArm, { data: IArm }>({
      query: ({ data }) => ({
        url: "",
        method: "post",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result): any => ["arm"],
    }),
    getArms: builder.query<IArm[], any>({
      query: (params) => ({
        url: "",
        params,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any =>
        (!err && result?.map((res) => ({ type: "arm", id: res?._id }))) || [],
    }),
    updateArm: builder.mutation<IArm, { id: string; data: Partial<IArm> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [
        { type: "arm", id: result?._id },
      ],
    }),
    getSingleArm: builder.query<IArm, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any => [
        { type: "arm", id: result?._id },
      ],
    }),
    deleteArm: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "delete",
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [{ type: "arm", id: arg }],
    }),
    countArms: builder.query<any, any>({
      query: (params) => ({
        url: "/count",
        params,
      }),
      transformResponse,
      transformErrorResponse,
    }),
  }),
});

export const {
  useCreateArmMutation,
  useGetArmsQuery,
  useGetSingleArmQuery,
  useDeleteArmMutation,
  useUpdateArmMutation,
  useCountArmsQuery,
} = armApi;
