import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import dayjs, { Dayjs } from 'dayjs'

export interface IReceipt {
  id: number,  
  departmentnumber: string, 
  name: string, 
  quantity: number, 
  price: number, 
  date: string
}

export interface IReceiptArr {
  receipt: IReceipt[],
  isLoaded: boolean,
  error: string
}

const initialState: IReceiptArr = {
  receipt: [],
  isLoaded: false,
  error: ''
}

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    
  },
})

// Action creators are generated for each case reducer function
export const {  } = receiptSlice.actions

export default receiptSlice.reducer