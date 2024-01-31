import { transformErrorResponse, transformResponse } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILevel } from "library";

export const levelApi = createApi({
  reducerPath: "levelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/levels`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createLevel: builder.mutation<ILevel, { data: ILevel }>({
      query: ({ data }) => ({
        url: "",
        method: "post",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result): any => [{ type: "level" }],
    }),
    getLevels: builder.query<ILevel[], any>({
      query: (params) => ({
        url: "",
        params,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any =>
        (!err && result?.map((res) => ({ type: "level", id: res?._id }))) || [],
    }),
    updateLevel: builder.mutation<
      ILevel,
      { id: string; data: Partial<ILevel> }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [
        { type: "level", id: result?._id },
      ],
    }),
    getSingleLevel: builder.query<ILevel, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any => [
        { type: "level", id: result?._id },
      ],
    }),
    deleteLevel: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "delete",
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [{ type: "level", id: arg }],
    }),
    countLevel: builder.query<any, any>({
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
  useCreateLevelMutation,
  useGetLevelsQuery,
  useGetSingleLevelQuery,
  useDeleteLevelMutation,
  useUpdateLevelMutation,
  useCountLevelQuery,
} = levelApi;
