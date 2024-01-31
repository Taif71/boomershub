import { transformErrorResponse, transformResponse } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IStudent } from "library";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/students`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    createStudent: builder.mutation<IStudent, { data: Partial<IStudent> }>({
      query: ({ data }) => ({
        url: "",
        method: "post",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result): any => [{ type: "student" }],
    }),
    getStudents: builder.query<IStudent[], any>({
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
            type: "student",
            id: res._id,
          }))) ||
        [],
    }),
    updateStudent: builder.mutation<
      IStudent,
      { id: string; data: Partial<IStudent> }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [
        { type: "student", id: result?._id },
      ],
    }),
    getSingleStudent: builder.query<IStudent, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any => [
        { type: "student", id: result?._id },
      ],
    }),
    deleteStudent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "delete",
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [
        { type: "student", id: arg },
      ],
    }),
    countStudent: builder.query<any, any>({
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
  useCreateStudentMutation,
  useGetStudentsQuery,
  useGetSingleStudentQuery,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
  useCountStudentQuery,
} = studentApi;
