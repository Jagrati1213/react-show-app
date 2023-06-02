import { configureStore } from '@reduxjs/toolkit';
import userDetailsSlice from '../store/slices/AuthSlice'

export const store = configureStore({
    reducer: {
        user: userDetailsSlice
    }
});