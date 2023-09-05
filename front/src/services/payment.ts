import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IPayment } from '../store/slices/payment/paymentSlice'

// Define a service using a base URL and expected endpoints
export const paymentApi = createApi({
  reducerPath: 'payment',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: ['Payment'],
  endpoints: (builder) => ({
    getPayment: builder.query<IPayment[], void>({
        query: () => `/payment`,
        providesTags: ['Payment']
    }),
    postPayment: builder.mutation<IPayment[], Omit<IPayment, 'id' | 'date'>>({
        query: (payment) => ({
            url: "payment",
            method: "post",
            body: payment,
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: (result) => ['Payment']
    }),
    putPayment: builder.mutation<IPayment[], Omit<IPayment, 'date'>>({
        query: (payment) => ({
            url: `payment`,
            method: "put",
            body: payment,
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: (result) => ['Payment']
    }),
    deletePaymentBank: builder.mutation<IPayment[], Omit<IPayment, 'date'>>({
        query: (payment) => ({
            url: `payment`,
            method: "delete",
            body: payment,
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: (result) => ['Payment']
    }),
    deletePayment: builder.mutation<IPayment[], IPayment>({
        query: (payment) => ({
            url: `payment/${payment.id}`,
            method: "delete",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: (result) => ['Payment']
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPaymentQuery, usePostPaymentMutation, usePutPaymentMutation, useDeletePaymentMutation, useDeletePaymentBankMutation } = paymentApi