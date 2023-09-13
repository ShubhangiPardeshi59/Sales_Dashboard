import {useReducer} from "react"

//initial values
const initialInputState = {
    value:0,
    isTouched:'false'
}

//reducer funtion (its telling what are actions)
const inputStateReducer = (state,action) =>{
    if(action.type == 'INPUT'){
        return {value:action.value,isTouched: state.isTouched}
    }
    if(action.type == 'BLUR'){
        return {value:state.value,isTouched:true}
    }
    if(action.type == 'RESET'){
        return {value:'',isTouched: false}
    }
}

// custome hook where reducer is used (its telling how to implement actions)
export default function  useInput(validationFunction){
    const [inputState,dispatch] = useReducer(
        inputStateReducer,
        initialInputState
    )

    // call the validationFunction
    const isValidInput = validationFunction(inputState.value)

    //check if has error
    const hasError = !isValidInput && inputState.isTouched;

    const inputChangeHandler = (event) =>{
        dispatch({type:'INPUT',value:event.target.value})
    }

    const inputBlurHandler = (event) =>{
        dispatch({type:'BLUR'})
    }

    const inputrResetHandler = (event) =>{
        dispatch({type:'RESET'})
    }

    return {
        value: inputState.value,
        isValid:isValidInput,
        hasError,
        inputChangeHandler,
        inputBlurHandler,
        inputrResetHandler
    };
}