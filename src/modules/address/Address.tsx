import { Button, Input, InputLabel, Typography } from "@material-ui/core";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAddress, getCurrentAddressValidationMessage, setCurrentAddress, validateAddress } from './address.reducer';

const Address: FunctionComponent = () => {
    const dispatch = useDispatch();
    const currentAddress = useSelector(getCurrentAddress);
    const validationMessage = useSelector(getCurrentAddressValidationMessage)
    return (
        <div>
            <InputLabel>Your address : </InputLabel>
            <Input
                value={currentAddress}
                onChange={(ev) => {
                    dispatch(setCurrentAddress(ev.target.value));
                }}
            />
            <Button
                onClick={() => {
                    dispatch(validateAddress);
                }}

            >Submit</Button>
            <Typography>{validationMessage}</Typography>


        </div>
    )
}

export default Address;