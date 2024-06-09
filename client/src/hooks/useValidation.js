import { useState } from "react";
import { REGISTER_ERROR_MSGS } from '../constants/errorMessages';

export default function useValidation(validateValue) {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    const [valueIsValid, errorMsg] = validateValue(enteredValue);
    
    const hasError = isTouched && !valueIsValid;

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    }

    const onBlur = () => setIsTouched(true);
    
    const errorMessage = hasError ? errorMsg: '';
 
    return {
        value: enteredValue,
        isValid: valueIsValid,
        errorMessage,
        hasError,
        valueChangeHandler,
        onBlur
    }
}