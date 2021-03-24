import { AnyAction, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { getTransactionsFromServer, setTransactions } from "../transactions/transactions.reducer";


interface AddressState {
    current_address: string;
    current_address_valid: boolean | null;
    address_validation_message: string;
}

const initialState: AddressState = {
    current_address: '',
    current_address_valid: null,
    address_validation_message: '',
};

export const AddressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setCurrentAddress: (state: AddressState, action: PayloadAction<string>) => {
            state.current_address = action.payload;
        },
        setCurrentAddressValid: (state: AddressState, action: PayloadAction<boolean>) => {
            state.current_address_valid = action.payload;
        },
        setCurrentAddressValidationMessage: (state: AddressState, action: PayloadAction<string>) => {
            state.address_validation_message = action.payload;
        },
    },
});

export const { setCurrentAddress, setCurrentAddressValid, setCurrentAddressValidationMessage } = AddressSlice.actions;


export const getCurrentAddress = (state: RootState): string => state.address.current_address;
export const getCurrentAddressValidationMessage = (state: RootState): string => state.address.address_validation_message;



export const validateAddress = async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const state = getState();
    const fromEtherscan = await axios.get(
        'https://api.etherscan.io/api?module=account&action=balance&address=' +
        state.address.current_address +
        '&tag=latest&apikey=' +
        process.env.REACT_APP_ETHERSCAN_API_KEY
    );
    if (fromEtherscan.data.message === 'OK') {
        dispatch(setCurrentAddressValid(true));
        dispatch(setCurrentAddressValidationMessage("Address OK"));
        dispatch(getTransactionsFromServer as unknown as AnyAction);
    } else {
        dispatch(setCurrentAddressValid(false));
        dispatch(setCurrentAddressValidationMessage(fromEtherscan.data.result));
    }

}




export default AddressSlice.reducer;

