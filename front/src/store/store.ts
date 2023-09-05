import { configureStore } from '@reduxjs/toolkit'
import { reportApi } from '../services/report'
import { setupListeners } from '@reduxjs/toolkit/query'
import { paymentApi } from '../services/payment'
import { bankApi } from '../services/bank'
import { receiptApi } from '../services/receipt'
import { returnsApi } from '../services/returns'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [reportApi.reducerPath]: reportApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [bankApi.reducerPath]: bankApi.reducer,
    [receiptApi.reducerPath]: receiptApi.reducer,
    [returnsApi.reducerPath]: returnsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reportApi.middleware, paymentApi.middleware, bankApi.middleware, receiptApi.middleware, returnsApi.middleware),  
    
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)