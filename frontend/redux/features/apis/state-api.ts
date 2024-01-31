import { IError } from "@/interfaces/error.interface";
import { transformErrorResponse, transformResponse } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IState } from "library";

export const stateApi = createApi({
  reducerPath: "stateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/states`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createState: builder.mutation<
      Promise<IState | IError>,
      { data: Partial<IState> }
    >({
      query: ({ data }) => ({
        url: "",
        method: "post",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result): any => [{ type: "state" }],
    }),
    getStates: builder.query<IState[], any>({
      query: (params: any) => ({
        url: "",
        params: params,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any =>
        !err && result?.map((res) => ({ type: "state", id: res?._id })) || [],
    }),
    updateState: builder.mutation<
      IState,
      { id: string; data: Partial<IState> }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [
        { type: "state", id: result?._id },
      ],
    }),
    getSingleState: builder.query<IState, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any => [
        { type: "state", id: result?._id },
      ],
    }),
    countState: builder.query<any, any>({
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
  useGetStatesQuery,
  useGetSingleStateQuery,
  useUpdateStateMutation,
  useCreateStateMutation,
  useCountStateQuery
} = stateApi;
