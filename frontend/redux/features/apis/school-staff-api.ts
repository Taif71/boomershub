import { transformErrorResponse, transformResponse } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISchool, ISchoolStaff } from "library";

export const schoolStaffApi = createApi({
  reducerPath: "schoolStaffApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/schoolstaffs`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createSchoolStaff: builder.mutation<ISchoolStaff, Partial<ISchoolStaff>>({
      query: (data) => ({ url: "", method: "post", body: data }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result): any => [{ type: "schoolStaff" }],
    }),
    getSchoolStaffs: builder.query<ISchoolStaff[], any>({
      query: (params) => ({ url: "", params }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any =>
        (!err &&
          result?.map((res) => ({ type: "schoolStaff", id: res?._id }))) ||
        [],
    }),
    updateSchoolStaff: builder.mutation<
      ISchoolStaff,
      { id: string; data: ISchoolStaff }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [
        { type: "schoolStaff", id: result?._id },
      ],
    }),
    getSingleSchoolStaff: builder.query<ISchoolStaff, string>({
      query: (id) => ({ url: `/${id}` }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any => [
        { type: "schoolStaff", id: result?._id },
      ],
    }),
    deleteSchoolStaff: builder.mutation<void, string>({
      query: (id) => ({ url: `/${id}`, method: "delete" }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [
        { type: "schoolStaff", id: arg },
      ],
    }),
    countSchoolStaff: builder.query<any, any>({
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
  useCreateSchoolStaffMutation,
  useGetSchoolStaffsQuery,
  useGetSingleSchoolStaffQuery,
  useDeleteSchoolStaffMutation,
  useUpdateSchoolStaffMutation,
  useCountSchoolStaffQuery,
} = schoolStaffApi;
