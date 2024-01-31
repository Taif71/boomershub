import { transformErrorResponse, transformResponse } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAttendance, IStudent } from "library";

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/attendances`,
    credentials: "include",
  }),
  tagTypes: ["attendance"],
  endpoints: (builder) => ({
    createAttendance: builder.mutation<
      IAttendance,
      { data: Partial<IAttendance> }
    >({
      query: ({ data }) => ({
        url: "",
        method: "post",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result): any => [{ type: "attendance" }],
    }),
    getAttendance: builder.query<IAttendance[], any>({
      query: (params) => ({
        url: "",
        method: "get",
        params,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any =>
        (!err &&
          result?.map((res) => ({
            type: "attendance",
            id: res._id,
          }))) ||
        [],
    }),
    updateAttendance: builder.mutation<
      IAttendance,
      { id: string; data: IAttendance }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "patch",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [
        { type: "attendance", id: result?._id },
      ],
    }),
    getSingleAttendance: builder.query<IAttendance, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any => [
        { type: "attendance", id: result?._id },
      ],
    }),
    deleteAttendance: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "delete",
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [
        { type: "attendance", id: arg },
      ],
    }),
    countAttendance: builder.query<any, any>({
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
  useCreateAttendanceMutation,
  useGetAttendanceQuery,
  useGetSingleAttendanceQuery,
  useDeleteAttendanceMutation,
  useUpdateAttendanceMutation,
  useCountAttendanceQuery,
} = attendanceApi;
