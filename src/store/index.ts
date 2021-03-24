import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';

import { combineReducers } from "redux";
import addressRedeucer from "../modules/address/address.reducer";
import transactionsRedeucer from "../modules/transactions/transactions.reducer";

const reducers = combineReducers({
    address: addressRedeucer,
    transactions: transactionsRedeucer,
});


export const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
