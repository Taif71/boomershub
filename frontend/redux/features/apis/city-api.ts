import { transformErrorResponse, transformResponse } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICity } from "library";

export const cityApi = createApi({
  reducerPath: "cityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/cities`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCity: builder.mutation<ICity, ICity>({
      query: (data) => ({ url: "", method: "post", body: data }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result): any => [{ type: "city" }],
    }),
    getCities: builder.query<ICity[], any>({
      query: (params) => ({ url: "", params }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any =>
        !err && result?.map((res) => ({ type: "city", id: res?._id })) || [],
    }),
    updateCity: builder.mutation<ICity, { id: string; data: ICity }>({
      query: ({ id, data }) => ({ url: `/${id}`, method: "patch", body: data }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [
        { type: "city", id: result?._id },
      ],
    }),
    getSingleCity: builder.query<ICity, string>({
      query: (id) => ({ url: `/${id}` }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any => [
        { type: "city", id: result?._id },
      ],
    }),
    deleteCity: builder.mutation<void, string>({
      query: (id) => ({ url: `/${id}`, method: "delete" }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [{ type: "city", id: arg }],
    }),
  }),
});

export const {
  useCreateCityMutation,
  useGetCitiesQuery,
  useGetSingleCityQuery,
  useDeleteCityMutation,
  useUpdateCityMutation,
} = cityApi;
