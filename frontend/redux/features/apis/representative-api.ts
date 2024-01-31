import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRepresentative } from "library";

export const representativeApi = createApi({
  reducerPath: "representativeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/representatives`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createRepresentative: builder.mutation<
      IRepresentative,
      { data: Partial<IRepresentative> }
    >({
      query: ({ data }) => ({
        url: "",
        method: "post",
        body: data,
      }),
      transformResponse: (result: any) => result?.data,
      invalidatesTags: (result): any => [{ type: "representative" }],
    }),
    getRepresentative: builder.query<IRepresentative[], any>({
      query: (params) => ({
        url: "",
        params,
      }),
      providesTags: (result, err, arg): any =>
        result?.map((res) => ({ type: "representative", id: res?._id })),
      transformResponse: (result: any) => result?.data,
    }),
    updateRepresentative: builder.mutation<
      IRepresentative,
      { id: string; data: IRepresentative }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "patch",
        body: data,
      }),
      transformResponse: (result: any) => result?.data,
      invalidatesTags: (result, err, arg): any => [
        { type: "representative", id: result?._id },
      ],
    }),
    getSingleRepresentative: builder.query<IRepresentative, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
      transformResponse: (result: any) => result?.data,
      providesTags: (result, err, arg): any => [
        { type: "representative", id: result?._id },
      ],
    }),
    deleteRepresentative: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "delete",
      }),
      transformResponse: (result: any) => result?.data,
      invalidatesTags: (result, err, arg): any => [
        { type: "representative", id: arg },
      ],
    }),
  }),
});

export const {
  useCreateRepresentativeMutation,
  useGetRepresentativeQuery,
  useGetSingleRepresentativeQuery,
  useDeleteRepresentativeMutation,
  useUpdateRepresentativeMutation,
} = representativeApi;
