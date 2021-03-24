import { AnyAction, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import { RootState } from "../../store";
import ITransaction from './transactions.interface';


interface TransactionsState {
    transactions: ITransaction[];
}

const initialState: TransactionsState = {
    transactions: [],
};

export const TransactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setTransactions: (state: TransactionsState, action: PayloadAction<ITransaction[]>) => {
            state.transactions = action.payload;
        }
    },
});

export const { setTransactions } = TransactionsSlice.actions;

export const getTransaction = (state: RootState): ITransaction[] => state.transactions.transactions;


export const getTransactionsFromServer = async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const state = getState();
    let fromEtherscanTransactions = await axios.get(
        'https://api.etherscan.io/api?module=account&action=txlist&address=' +
        state.address.current_address +
        '&startblock=0&endblock=99999999&sort=asc&apikey=M26YQVUEGM3TRPMJ63ABVE188BXWMQ7ERI'
    );
    if (fromEtherscanTransactions.data.message === 'OK') {
        dispatch(setTransactions(fromEtherscanTransactions.data.result.map((val: ITransaction) => {
            return { ...val, id: val.hash, formatted_timestamp: moment(val.timeStamp * 1000).format('LLLL') }
        })));
    } else {
        console.log('fromEtherscanTransactions.data is: ', fromEtherscanTransactions.data);
    }

}




export default TransactionsSlice.reducer;

