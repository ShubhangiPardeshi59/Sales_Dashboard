import {useState } from "react";
import classes from "../../form/Form.module.css";

export default function SimpleInput() {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  let enteredNameIsValid = enteredName.trim() !== "";
  let formIsValid = false;

  if(enteredNameIsValid){
    formIsValid = true;
  }
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = () => {
    setEnteredNameTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);
    setEnteredName("");
    setEnteredName(false)
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameInputClasses = nameInputIsInvalid
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
      </div>
      {nameInputIsInvalid && (
        <p className={classes.errorText}>Name must not be empty.</p>
      )}
      <div className={classes.formActions}>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
}

