import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IReceipt } from '../store/slices/receipt/receiptSlice'

// Define a service using a base URL and expected endpoints
export const receiptApi = createApi({
  reducerPath: 'receipt',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: ['Receipt'],
  endpoints: (builder) => ({
    getReceipt: builder.query<IReceipt[], void>({
        query: () => `/receipt`,
        providesTags: ['Receipt']
    }),
    postReceipt: builder.mutation<IReceipt[], Omit<IReceipt, 'id' | 'date'>>({
        query: (receipt) => ({
            url: "receipt",
            method: "post",
            body: receipt,
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: ['Receipt']
    }),
    putReceipt: builder.mutation<IReceipt[], Omit<IReceipt, 'date'>>({
        query: (receipt) => ({
            url: `receipt`,
            method: "put",
            body: receipt,
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: ['Receipt']
    }),
    deleteReceipt: builder.mutation<IReceipt[], IReceipt>({
        query: (receipt) => ({
            url: `receipt`,
            method: "delete",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: ['Receipt']
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetReceiptQuery, usePostReceiptMutation, usePutReceiptMutation, useDeleteReceiptMutation } = receiptApi