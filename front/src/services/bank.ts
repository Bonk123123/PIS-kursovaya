import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IBank } from '../store/slices/bank/bankSlice'

// Define a service using a base URL and expected endpoints
export const bankApi = createApi({
  reducerPath: 'bank',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: ['Bank'],
  endpoints: (builder) => ({
    getBank: builder.query<IBank[], void>({
        query: () => `/bank`,
        providesTags: (result) => ['Bank']
    }),
    postBank: builder.mutation<IBank[], Omit<IBank, "id" | "date">>({
        query: (bank) => ({
            url: "bank",
            method: "post",
            body: bank,
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: (result) => ['Bank']
    }),
    putBank: builder.mutation<IBank[], Omit<IBank, "date">>({
        query: (bank) => ({
            url: `bank`,
            method: "put",
            body: bank,
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: (result) => ['Bank']
    }),
    deleteBank: builder.mutation<IBank[], IBank>({
        query: (bank) => ({
            url: `bank/${bank.id}`,
            method: "delete",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: (result) => ['Bank']
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBankQuery, usePostBankMutation, usePutBankMutation, useDeleteBankMutation } = bankApi