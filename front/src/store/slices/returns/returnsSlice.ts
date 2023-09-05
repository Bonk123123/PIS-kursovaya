import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import dayjs, { Dayjs } from 'dayjs'

export interface IReturns {
  id: number,  
  buyer: string, 
  reasonforreturn: string, 
  name: string, 
  quantity: number, 
  date: string, 
  saleid: number,
  price: number
}

export interface IReturnsArr {
  report: IReturns[],
  isLoaded: boolean,
  error: string
}

const initialState: IReturnsArr = {
  report: [],
  isLoaded: false,
  error: ''
}

export const returnsSlice = createSlice({
  name: 'returns',
  initialState,
  reducers: {
    
  },
})

// Action creators are generated for each case reducer function
export const {  } = returnsSlice.actions

export default returnsSlice.reducer