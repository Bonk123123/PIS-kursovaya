import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Dayjs } from 'dayjs'

export interface IBank {
  id: number,
  buyer: string,
  name: string,
  quantity: number,
  price: number,
  date: string 
}

export interface IBankArr {
  bank: IBank[],
  isLoaded: boolean,
  error: string
}

const initialState: IBankArr = {
  bank: [],
  isLoaded: false,
  error: ''
}

export const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    
  },
})

// Action creators are generated for each case reducer function
export const {  } = bankSlice.actions

export default bankSlice.reducer