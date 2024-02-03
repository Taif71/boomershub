import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { transformResponse, transformErrorResponse } from '@/utils/helper'
import { IFolder } from "@/interfaces/folders/IFolder";

export const foldersApi = createApi({
  reducerPath: "foldersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/folders`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createFolder: builder.mutation<IFolder, { data: any }>({
      query: ({ data } : any) => ({
        url: "",
        method: "post",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result): any => ["folders"],
    }),
    getFolders: builder.query<IFolder[], any>({
      query: (params) => ({
        url: "",
        params,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any =>
        (!err && result?.map((res) => ({ type: "folders", id: res?.id }))) || [],
    }),
    updateFolder: builder.mutation<IFolder, { id: string; data: Partial<IFolder> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [
        { type: "folders", id: result?.id },
      ],
    }),
    getSingleFolder: builder.query<IFolder, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any => [
        { type: "folders", id: result?.id },
      ],
    }),
    deleteFolder: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "delete",
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [{ type: "folders", id: arg }],
    }),
    // countFolders: builder.query<any, any>({
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
  useCreateFolderMutation,
  useGetFoldersQuery,
  useGetSingleFolderQuery,
  useDeleteFolderMutation,
  useUpdateFolderMutation,
//   useCountFoldersQuery,
} = foldersApi;
