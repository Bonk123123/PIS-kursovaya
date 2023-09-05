import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Dayjs } from 'dayjs'

export interface IPayment {
  id: number,
  buyer: string,
  name: string,
  quantity: number,
  price: number,
  date: string 
}

export interface IPaymentArr {
  payment: IPayment[],
  isLoaded: boolean,
  error: string
}

const initialState: IPaymentArr = {
  payment: [],
  isLoaded: false,
  error: '' 
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    getData: (state, action: PayloadAction<IPayment[]>) => {
      state.payment = action.payload
      state.isLoaded = false
      state.error = ''
      console.log(action.payload)
    },

  },
})

// Action creators are generated for each case reducer function
export const { getData } = paymentSlice.actions

export default paymentSlice.reducer