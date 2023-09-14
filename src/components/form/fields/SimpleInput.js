import { useSelector,useDispatch } from "react-redux";
import { useCallback,useEffect } from "react";
import useInput from "../hooks/use-input2";
import classes from "../../form/Form.module.css";

import { validateAge, validateAmount} from "../validation/validations";

const monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"]

const calculateMonth = (date) =>{
 let val = date.toString().slice(5,7);
 return monthArray[parseInt(val) - 1];
}

const calculateYear = (date) =>{
  let val = date.toString().slice(0,4);
  return parseInt(val);
 }


const SimpleInput = (props) => {
  
  const dispatch = useDispatch();
  const dataLength = useSelector(
    (state) => state.apiDataReducer.length
  );
  const {
    value: enteredAge,
    isValid: enteredAgeIsValid,
    hasError: ageInputHasError,
    valueChangeHandler: ageChangedHandler,
    inputBlurHandler: ageBlurHandler,
    reset: ageReset,
  } = useInput((value) => validateAge(value));

  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: dateInputHasError,
    valueChangeHandler: dateChangedHandler,
    inputBlurHandler: dateBlurHandler,
    reset: dateReset,
  } = useInput((value) => value !== "");

  const {
    value: selectedCategory,
    isValid: selectedCategoryIsValid,
    hasError: categoryHasError,
    valueChangeHandler: categoryChangedHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: categoryReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: selectedSubCategory,
    isValid: selectedSubCategoryIsValid,
    hasError: subCategoryHasError,
    valueChangeHandler: subCategoryChangedHandler,
    inputBlurHandler: subCategoryBlurHandler,
    reset: subCategoryReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: selectedCountry,
    isValid: selectedCountryIsValid,
    hasError: countryHasError,
    valueChangeHandler: countryChangedHandler,
    inputBlurHandler: countryBlurHandler,
    reset: countryReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: selectedState,
    isValid: selectedStateIsValid,
    hasError: stateHasError,
    valueChangeHandler: stateChangedHandler,
    inputBlurHandler: stateBlurHandler,
    reset: stateReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: quantity,
    isValid: quantityIsValid,
    hasError: quantityHasError,
    valueChangeHandler: quantityChangedHandler,
    inputBlurHandler: quantityBlurHandler,
    reset: quantityReset,
  } = useInput((value) => validateAmount(value));

  const {
    value: priceInput,
    isValid: priceInputIsValid,
    hasError: priceInputHasError,
    valueChangeHandler: priceInputChangedHandler,
    inputBlurHandler: priceInputBlurHandler,
    reset: priceInputReset,
  } = useInput((value) => validateAmount(value));

  const {
    value: enteredCost,
    isValid: costIsValid,
    hasError: costHasError,
    valueChangeHandler: costChangedHandler,
    inputBlurHandler: costBlurHandler,
    reset: costReset,
  } = useInput((value) => validateAmount(value));

  const {
    value: gender,
    isValid: genderIsValid,
    hasError: genderHasError,
    valueChangeHandler: genderChangedHandler,
    inputBlurHandler: genderBlurHandler,
    reset: genderReset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  // this condition is for whether to disable the button or not
  if (
    enteredAgeIsValid &&
    enteredDateIsValid &&
    selectedCategoryIsValid &&
    selectedSubCategoryIsValid &&
    selectedCountryIsValid &&
    selectedStateIsValid &&
    priceInputIsValid && 
    quantityIsValid &&
    costIsValid &&
    genderIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // if (!enteredAgeIsValid || !enteredDateIsValid || !selectedCategoryIsValid) {
    //   return;
    // }

   console.log("data length is ",dataLength)
    const data = {
      "id":dataLength + 1,
      "index":dataLength + 1,
      "date":enteredDate,
      "year":calculateYear(enteredDate),
      "month":calculateMonth(enteredDate),
      "customer_age": enteredAge,
      "customer_gender":gender,
      "country":selectedCountry,
      "state":selectedState,
      "product_category":selectedCategory,
      "sub_category":selectedSubCategory,
      "quantity":parseInt(quantity),
      "unit_cost":parseInt(enteredCost),
      "unit_price":parseInt(priceInput),
      "cost": parseInt(quantity) * parseInt(enteredCost),
      "revenue":parseInt(quantity) * parseInt(priceInput),
      
    }
    fetch("http://localhost:8000/sales",{
      method:'POST',
      body : JSON.stringify(data),
      headers:{
        'Content-Type' :'application/json'
      }
    })
    
    console.log("data stored successfully ",[data]);
    ageReset();
    dateReset();
    categoryReset();
    subCategoryReset();
    countryReset();
    stateReset();
    quantityReset();
    priceInputReset();
    costReset();
    genderReset();

    //fetch data again
    fetchDataHandler();
    //const fetched_data = get_data();
    //dispatch({ type: "get_data", value: fetched_data });
   props.setIsSubmitted(true);
  };


  const fetchDataHandler = useCallback(async () => {
    const response = await fetch("http://localhost:8000/sales");
    const data = await response.json();
    dispatch({ type: "get_data", value: data });
  }, [dispatch]);

  const ageInputClasses = ageInputHasError
    ? `${classes.formControl} ${classes.col4} ${classes.invalid}`
    : `${classes.formControl} ${classes.col4}`;

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


    const genderClasses = genderHasError
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
          id="age"
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
          <option value="India">India</option>
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
          value = {selectedState}
        >
          <option value="" disabled></option>
          <option value="Washington">Washington</option>
          <option value="California">California</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Karnataka">Karnataka</option>
        </select>
        {stateHasError && (
          <p className={classes.errorText}>Country must not be empty</p>
        )}
      </div>

      <div className={quantityClasses}>
        <label htmlFor="quantity">Quantity</label>
        <input
          type="quantity"
          id="quantity"
          onChange={quantityChangedHandler}
          onBlur={quantityBlurHandler}
          value={quantity}
        />
        {quantityHasError && (
          <p className={classes.errorText}>Quantity must not be empty or zero.</p>
        )}
      </div>

      </div>

      <div className={classes.row}>
      
      <div className={priceClasses}>
        <label htmlFor="price">Price</label>
        <input
          type="price"
          id="price"
          onChange={priceInputChangedHandler}
          onBlur={priceInputBlurHandler}
          value={priceInput}
        />
        {priceInputHasError && (
          <p className={classes.errorText}>Price must not be empty or zero.</p>
        )}
      </div>

      <div className={costClasses}>
        <label htmlFor="cost">Cost</label>
        <input
          type="cost"
          id="cost"
          onChange={costChangedHandler}
          onBlur={costBlurHandler}
          value={enteredCost}
        />
        {costHasError && (
          <p className={classes.errorText}>Cost price must not be empty or zero.</p>
        )}
      </div>

      <div className={ageInputClasses}>
        <label htmlFor="age">Age</label>
        <input
          type="text"
          id="age"
          onChange={ageChangedHandler}
          onBlur={ageBlurHandler}
          value={enteredAge}
        />
        {ageInputHasError && (
          <p className={classes.errorText}>
            Age must not be empty and Age should be between 0 to 120
          </p>
        )}
      </div>
      </div>
      {/* <div className={genderClasses}>
        <input type="radio" id="male" checked ={gender === "male" }
        name="gender" value="male" onChange={genderChangedHandler} onBlur={genderBlurHandler}/>
        <label htmlFor="male">Male</label>
        
        <input type="radio" id="female" checked ={gender === "female" }
        name="gender" value="female" onChange={genderChangedHandler} onBlur={genderBlurHandler} />
        <label htmlFor="female">Female</label>
        {genderHasError && (
          <p className={classes.errorText}>Gender must be selected.</p>
        )}
      </div> */}

      <div className={genderClasses}>
        <label htmlFor="gender">Gender</label>
        <select
          id="state"
          onChange={genderChangedHandler}
          onBlur={genderBlurHandler}
          value = {gender}
        >
          <option value="" disabled></option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {stateHasError && (
          <p className={classes.errorText}>Country must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
