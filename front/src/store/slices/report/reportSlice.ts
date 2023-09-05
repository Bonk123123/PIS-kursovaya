import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import dayjs, { Dayjs } from 'dayjs'

export interface IReport {
  type: string,
  date: string,
  sum: number
}

export interface IReportArr {
  report: IReport[],
  isLoaded: boolean,
  error: string
}

const initialState: IReportArr = {
  report: [],
  isLoaded: false,
  error: ''
}

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    
  },
})

// Action creators are generated for each case reducer function
export const {  } = reportSlice.actions

export default reportSlice.reducer