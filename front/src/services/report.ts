import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IReport } from '../store/slices/report/reportSlice'

export interface queryParams {
  sorting: void | string,
  direction: void | string
}

// Define a service using a base URL and expected endpoints
export const reportApi = createApi({
  reducerPath: 'report',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: ['Report'],
  endpoints: (builder) => ({
    getReport: builder.query<IReport[], queryParams>({
      
      query: (params) => {
        if (params) {
          const { sorting, direction } = params
          return {
            url: "/report",
            params: { sorting, direction }
          }
        } else {
          return {
            url: "/report"
          }
        }
      },
      providesTags: ['Report'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetReportQuery } = reportApi