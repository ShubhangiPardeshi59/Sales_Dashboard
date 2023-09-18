import { useReducer } from "react";

const inputStateReducer = (state , action) => {
  if (action.type === "INPUT") {
    return {  isTouched: state.isTouched,value: action.value };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value:action.value};
  }
  return state;
};

// custome hook where reducer is used (its telling how to implement actions)
const useInput = (validateValue,initialInputState) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  // call the validationFunction
  const valueIsValid = validateValue(inputState.value);
  //check if has error
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET", value: initialInputState.value });
  };
  //console.log("initial input state" ,initialInputState.value)
 console.log("initial input state" ,initialInputState.value);
 console.log(" input state value" ,inputState.value);
  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
