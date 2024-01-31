import { transformErrorResponse, transformResponse } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMedia } from "library";

export const fileUploadApi = createApi({
  reducerPath: "fileUploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/file`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation<IMedia, FormData>({
      query: (data) => ({
        url: "/upload",
        method: "post",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
    }),
  }),
});
export const { useUploadFileMutation } = fileUploadApi;
