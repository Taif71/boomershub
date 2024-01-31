import { transformErrorResponse, transformResponse } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISchool } from "library";

export const schoolApi = createApi({
  reducerPath: "schoolApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/schools`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createSchool: builder.mutation<ISchool, ISchool>({
      query: (data) => ({ url: "", method: "post", body: data }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result): any => [{ type: "school" }],
    }),
    getSchools: builder.query<ISchool[], any>({
      query: (params) => ({ url: "", params }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any =>
        !err && result?.map((res) => ({ type: "school", id: res?._id })) || [],
    }),
    updateSchool: builder.mutation<ISchool, { id: string; data: Partial<ISchool> }>({
      query: ({ id, data }) => ({ url: `/${id}`, method: "PATCH", body: data }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [
        { type: "school", id: result?._id },
      ],
    }),
    getSingleSchool: builder.query<ISchool, string>({
      query: (id) => ({ url: `/${id}` }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any => [
        { type: "school", id: result?._id },
      ],
    }),
    deleteSchool: builder.mutation<void, string>({
      query: (id) => ({ url: `/${id}`, method: "delete" }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [{ type: "school", id: arg }],
    }),
    countSchool: builder.query<any, any>({
      query: (params) => ({
        url: '/count',
        params
      }),
      transformResponse,
      transformErrorResponse,
    })
  }),
});

export const {
  useCreateSchoolMutation,
  useGetSchoolsQuery,
  useGetSingleSchoolQuery,
  useDeleteSchoolMutation,
  useUpdateSchoolMutation,
  useCountSchoolQuery
} = schoolApi;
