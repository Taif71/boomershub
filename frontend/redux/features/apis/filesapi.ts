import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { transformResponse, transformErrorResponse } from '@/utils/helper'
import { IFiles } from "@/interfaces/files/IFiles";


export const filesApi = createApi({
  reducerPath: "filesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/files`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createFile: builder.mutation<IFiles, { data: IFiles }>({
      query: ({ data }) => ({
        url: "",
        method: "post",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result): any => ["files"],
    }),
    getFiles: builder.query<IFiles[], any>({
      query: (params) => ({
        url: "",
        params,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any =>
        (!err && result?.map((res) => ({ type: "files", id: res?.id }))) || [],
    }),
    updateFile: builder.mutation<IFiles, { id: string; data: Partial<IFiles> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [
        { type: "files", id: result?.id },
      ],
    }),
    // getSingleFile: builder.query<IFiles, string>({
    //   query: (id) => ({
    //     url: `/${id}`,
    //   }),
    //   transformResponse,
    //   transformErrorResponse,
    //   providesTags: (result, err, arg): any => [
    //     { type: "files", id: result?.id },
    //   ],
    // }),
    // deleteFile: builder.mutation<void, string>({
    //   query: (id) => ({
    //     url: `/${id}`,
    //     method: "delete",
    //   }),
    //   transformResponse,
    //   transformErrorResponse,
    //   invalidatesTags: (result, err, arg): any => [{ type: "files", id: arg }],
    // }),
    // countFiles: builder.query<any, any>({
    //   query: (params) => ({
    //     url: "/count",
    //     params,
    //   }),
    //   transformResponse,
    //   transformErrorResponse,
    // }),
  }),
});

export const {
  useCreateFileMutation,
  useGetFilesQuery,
  useUpdateFileMutation,
//   useGetSingleFileQuery,
//   useDeleteFileMutation,
//   useCountFoldersQuery,
} = filesApi;
