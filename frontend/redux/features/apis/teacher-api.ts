import { IError } from "@/interfaces/error.interface";
import { transformErrorResponse, transformResponse } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITeacher } from "library";

export const teacherApi = createApi({
  reducerPath: "teacherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/teachers`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createTeacher: builder.mutation<
      Promise<ITeacher | IError>,
      { data: Partial<ITeacher> }
    >({
      query: ({ data }) => ({
        url: "",
        method: "post",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result): any => [{ type: "teacher" }],
    }),
    getTeachers: builder.query<ITeacher[], any>({
      query: (params) => ({
        url: "",
        params,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any =>
        (!err && result?.map((res) => ({ type: "teacher", id: res?._id }))) ||
        [],
    }),
    updateTeacher: builder.mutation<
      ITeacher,
      { id: string; data: Partial<ITeacher> }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [
        { type: "teacher", id: result?._id },
      ],
    }),
    getSingleTeacher: builder.query<ITeacher, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any => [
        { type: "teacher", id: result?._id },
      ],
    }),
    deleteTeacher: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "delete",
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [
        { type: "teacher", id: arg },
      ],
    }),
    countTeacher: builder.query<any, any>({
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
  useCreateTeacherMutation,
  useGetTeachersQuery,
  useGetSingleTeacherQuery,
  useDeleteTeacherMutation,
  useUpdateTeacherMutation,
  useCountTeacherQuery,
} = teacherApi;
