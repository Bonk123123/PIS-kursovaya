import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IReturns } from '../store/slices/returns/returnsSlice'

// Define a service using a base URL and expected endpoints
export const returnsApi = createApi({
  reducerPath: 'returns',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: ['Returns'],
  endpoints: (builder) => ({
    getReturns: builder.query<IReturns[], void>({
        query: () => `/returns`,
        providesTags: ['Returns']
    }),
    postReturns: builder.mutation<IReturns[], Omit<IReturns, 'id' | 'date'>>({
        query: (returns) => ({
            url: "returns",
            method: "post",
            body: returns,
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: ['Returns']
    }),
    putReturns: builder.mutation<IReturns[], Omit<IReturns, 'date'>>({
        query: (returns) => ({
            url: `returns`,
            method: "put",
            body: returns,
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: ['Returns']
    }),
    deleteReturns: builder.mutation<IReturns[], IReturns>({
        query: (returns) => ({
            url: `returns/${returns.id}`,
            method: "delete",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: ['Returns']
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetReturnsQuery, usePostReturnsMutation, usePutReturnsMutation, useDeleteReturnsMutation } = returnsApi