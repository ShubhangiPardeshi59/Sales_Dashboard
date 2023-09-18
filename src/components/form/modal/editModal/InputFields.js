import { useSelector, useDispatch } from "react-redux";
import useInput from "../../hooks/use-input - Copy";
import classes from "./EditModal.module.css";

import {validateAmount} from "../../validation/validations";

const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const calculateMonth = (date) => {
  let val = date.toString().slice(5, 7);
  return monthArray[parseInt(val) - 1];
};

const calculateYear = (date) => {
  let val = date.toString().slice(0, 4);
  return parseInt(val);
};

export default function InputFields(props){
  const dispatch = useDispatch();

  //get the data or filtered data
  const data = useSelector((state) => state.apiDataReducer.filteredData);

  //get data for row to edit
  let currentRowContent = data[props.currentRowIndex];

  
  console.log("current row content ",currentRowContent)
  //initialize the variables or field states
  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: dateInputHasError,
    valueChangeHandler: dateChangedHandler,
    inputBlurHandler: dateBlurHandler,
    reset: dateReset,
  } = useInput((value) => value !== "",{value:currentRowContent["date"],isTouched:false});

  const {
    value: selectedCategory,
    isValid: selectedCategoryIsValid,
    hasError: categoryHasError,
    valueChangeHandler: categoryChangedHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: categoryReset,
  } = useInput((value) => value.trim() !== "",{value:currentRowContent["product_category"],isTouched:false});

  const {
    value: selectedSubCategory,
    isValid: selectedSubCategoryIsValid,
    hasError: subCategoryHasError,
    valueChangeHandler: subCategoryChangedHandler,
    inputBlurHandler: subCategoryBlurHandler,
    reset: subCategoryReset,
  } = useInput((value) => value.trim() !== "",{value:currentRowContent["sub_category"],isTouched:false});

  const {
    value: selectedCountry,
    isValid: selectedCountryIsValid,
    hasError: countryHasError,
    valueChangeHandler: countryChangedHandler,
    inputBlurHandler: countryBlurHandler,
    reset: countryReset,
  } = useInput((value) => value.trim() !== "",{value:currentRowContent["country"],isTouched:false});

  const {
    value: selectedState,
    isValid: selectedStateIsValid,
    hasError: stateHasError,
    valueChangeHandler: stateChangedHandler,
    inputBlurHandler: stateBlurHandler,
    reset: stateReset,
  } = useInput((value) => value.trim() !== "",{value:currentRowContent["state"],isTouched:false});

  const {
    value: quantity,
    isValid: quantityIsValid,
    hasError: quantityHasError,
    valueChangeHandler: quantityChangedHandler,
    inputBlurHandler: quantityBlurHandler,
    reset: quantityReset,
  } = useInput((value) => validateAmount(value),{value:currentRowContent["quantity"],isTouched:false});

  const {
    value: priceInput,
    isValid: priceInputIsValid,
    hasError: priceInputHasError,
    valueChangeHandler: priceInputChangedHandler,
    inputBlurHandler: priceInputBlurHandler,
    reset: priceInputReset,
  } = useInput((value) => validateAmount(value),{value:currentRowContent["unit_price"],isTouched:false});

  const {
    value: enteredCost,
    isValid: costIsValid,
    hasError: costHasError,
    valueChangeHandler: costChangedHandler,
    inputBlurHandler: costBlurHandler,
    reset: costReset,
  } = useInput((value) => validateAmount(value),{value:currentRowContent["unit_cost"],isTouched:false});

  //set initial form state
  let formIsValid = false;

  // this condition is for whether to disable the button or not
  if (
    enteredDateIsValid &&
    selectedCategoryIsValid &&
    selectedSubCategoryIsValid &&
    selectedCountryIsValid &&
    selectedStateIsValid &&
    priceInputIsValid &&
    quantityIsValid &&
    costIsValid 
  ) {
    formIsValid = true;
  }

  //on form submission
  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    const data = {
      date: enteredDate,
      year: calculateYear(enteredDate),
      month: calculateMonth(enteredDate),
      country: selectedCountry,
      state: selectedState,
      product_category: selectedCategory,
      sub_category: selectedSubCategory,
      quantity: quantity,
      unit_cost: enteredCost,
      unit_price: priceInput,
      cost: quantity *enteredCost,
      revenue: quantity * priceInput,
    };
    //update above data to json-server
    try {
      await fetch(`http://localhost:8000/sales/${props.currentRowIndex}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.error(e);
    }

    //reset the values
   
   
    

    //fetch data again
    fetchDataHandler();

    props.setshowEditModal(false);
    //props.setIsSubmitted(true);
  };

  //to fetch data
  const fetchDataHandler = async () => {
    const response = await fetch("http://localhost:8000/sales");
    const data = await response.json();
    dispatch({ type: "get_data", value: data });
  };

  const resetHandler = () =>{
    dateReset();
    categoryReset();
    subCategoryReset();
    countryReset();
    stateReset();
    quantityReset();
    priceInputReset();
    costReset();
  }

  //add class dynamically
  const dateInputClasses = dateInputHasError
    ? `${classes.formControl} ${classes.col4} ${classes.invalid}`
    : `${classes.formControl} ${classes.col4}`;

  const categoryClasses = categoryHasError
    ? `${classes.formControl} ${classes.col4} ${classes.invalid}`
    : `${classes.formControl} ${classes.col4}`;

  const subCategoryClasses = subCategoryHasError
    ? `${classes.formControl} ${classes.col4} ${classes.invalid}`
    : `${classes.formControl} ${classes.col4}`;

  const countryClasses = countryHasError
    ? `${classes.formControl} ${classes.col4} ${classes.invalid}`
    : `${classes.formControl} ${classes.col4}`;

  const stateClasses = stateHasError
    ? `${classes.formControl} ${classes.col4} ${classes.invalid}`
    : `${classes.formControl} ${classes.col4}`;

  const priceClasses = priceInputHasError
    ? `${classes.formControl} ${classes.col4} ${classes.invalid}`
    : `${classes.formControl} ${classes.col4}`;

  const costClasses = costHasError
    ? `${classes.formControl} ${classes.col4} ${classes.invalid}`
    : `${classes.formControl} ${classes.col4}`;

  const quantityClasses = quantityHasError
    ? `${classes.formControl} ${classes.col4} ${classes.invalid}`
    : `${classes.formControl} ${classes.col4}`;

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={classes.row}>
        <div className={dateInputClasses}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            onChange={dateChangedHandler}
            onBlur={dateBlurHandler}
            value={enteredDate}
          />
          {dateInputHasError && (
            <p className={classes.errorText}>Date must not be empty</p>
          )}
        </div>

        <div className={categoryClasses}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            onChange={categoryChangedHandler}
            onBlur={categoryBlurHandler}
            value={selectedCategory}
          >
            <option value="" disabled></option>
            <option value="Accessories">Accessories</option>
            <option value="Clothing">Clothing</option>
            <option value="Bikes">Bikes</option>
          </select>
          {categoryHasError && (
            <p className={classes.errorText}>Category must not be empty</p>
          )}
        </div>

        <div className={subCategoryClasses}>
          <label htmlFor="sub-category">Sub Category</label>
          <select
            id="sub-category"
            onChange={subCategoryChangedHandler}
            onBlur={subCategoryBlurHandler}
            value={selectedSubCategory}
          >
            <option value="" disabled></option>
            <option value="Gloves">Gloves</option>
            <option value="Jersys">Jersys</option>
            <option value="Mountain Bikes">Mountain Bikes</option>
          </select>
          {subCategoryHasError && (
            <p className={classes.errorText}>Sub Category must not be empty</p>
          )}
        </div>
      </div>

      <div className={classes.row}>
        <div className={countryClasses}>
          <label htmlFor="country">Country</label>
          <select
            id="country"
            onChange={countryChangedHandler}
            onBlur={countryBlurHandler}
            value={selectedCountry}
          >
            <option value="" disabled></option>
            <option value="France">France</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Germany">Germany</option>
            <option value="United States">United States</option>
          </select>
          {countryHasError && (
            <p className={classes.errorText}>Country must not be empty</p>
          )}
        </div>

        <div className={stateClasses}>
          <label htmlFor="state">State</label>
          <select
            id="state"
            onChange={stateChangedHandler}
            onBlur={stateBlurHandler}
            value={selectedState}
          >
            <option value="" disabled></option>
            <option value="Washington">Washington</option>
            <option value="California">California</option>
            <option value="Maharashtra">Texas</option>
            <option value="Karnataka">Florida</option>
          </select>
          {stateHasError && (
            <p className={classes.errorText}>State must not be empty</p>
          )}
        </div>

        <div className={quantityClasses}>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            onChange={quantityChangedHandler}
            onBlur={quantityBlurHandler}
            value={quantity}
          />
          {quantityHasError && (
            <p className={classes.errorText}>
              Quantity must not be empty or zero.
            </p>
          )}
        </div>
      </div>

      <div className={classes.row}>
        <div className={priceClasses}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            onChange={priceInputChangedHandler}
            onBlur={priceInputBlurHandler}
            value={priceInput}
          />
          {priceInputHasError && (
            <p className={classes.errorText}>
              Price must not be empty or zero.
            </p>
          )}
        </div>

        <div className={costClasses}>
          <label htmlFor="cost">Cost</label>
          <input
            type="number"
            id="cost"
            onChange={costChangedHandler}
            onBlur={costBlurHandler}
            value={enteredCost}
          />
          {costHasError && (
            <p className={classes.errorText}>
              Cost price must not be empty or zero.
            </p>
          )}
        </div>
        
      </div>
      <div className="form-actions">
        <button type="submit" disabled={!formIsValid}>Submit</button>
      </div>
      <div className="form-actions">
        <button type="reset" onReset={resetHandler}>Reset</button>
      </div>
    </form>
  );
};


