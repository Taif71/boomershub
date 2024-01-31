import { transformErrorResponse, transformResponse } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IClass } from "library";

export const classApi = createApi({
  reducerPath: "classApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/classes`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createClass: builder.mutation<IClass, { data: IClass }>({
      query: (data) => ({
        url: "",
        method: "post",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result): any => [{ type: "class" }],
    }),
    getClasss: builder.query<IClass[], any>({
      query: (params) => ({
        url: "",
        params,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any =>
        !err && result?.map((res) => ({ type: "class", id: res?._id })) || [],
    }),
    updateClass: builder.mutation<IClass, { id: string; data: Partial<IClass> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [
        { type: "class", id: result?._id },
      ],
    }),
    getSingleClass: builder.query<IClass, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any => [
        { type: "class", id: result?._id },
      ],
    }),
    deleteClass: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "delete",
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [{ type: "class", id: arg }],
    }),
    countClass: builder.query<any, any>({
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
  useCreateClassMutation,
  useGetClasssQuery,
  useGetSingleClassQuery,
  useDeleteClassMutation,
  useUpdateClassMutation,
  useCountClassQuery
} = classApi;
