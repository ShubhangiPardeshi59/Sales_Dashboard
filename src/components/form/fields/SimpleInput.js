import { useSelector, useDispatch } from "react-redux";
import useInput from "../hooks/use-input2";
import classes from "../../form/Form.module.css";

import { validateAge, validateAmount,validateQuantity } from "../validation/validations";
const get_data = async() =>{
  const response = await fetch("http://localhost:8000/sales");
    const somedata = await response.json();
  return somedata
}
const SimpleInput = () => {
  const dispatch = useDispatch();
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
    const data = {
      "id":3,
      "index":12345,
      "date":enteredDate,
      "year":2016,
      "month":"July",
      "customer_age": enteredAge,
      "customer_gender":gender,
      "country":selectedCountry,
      "state":selectedState,
      "product_category":selectedCategory,
      "sub_category":selectedSubCategory,
      "quantity":quantity,
      "unit_cost":enteredCost,
      "unit_price":priceInput,
      "const":80,
      "revenue":109
      
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

    const fetched_data = get_data();
    dispatch({ type: "get_data", value: fetched_data });
  };

  const ageInputClasses = ageInputHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const dateInputClasses = dateInputHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const categoryClasses = categoryHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const subCategoryClasses = subCategoryHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const countryClasses = countryHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const stateClasses = stateHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const priceClasses = priceInputHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const costClasses = costHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

    const genderClasses = genderHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

    
    const quantityClasses = quantityHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  return (
    <form onSubmit={formSubmissionHandler}>
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

      <div className={genderClasses}>
        <input type="radio" id="male" name="gender" value="male" onChange={genderChangedHandler} onBlur={genderBlurHandler}/>
        <label htmlFor="male">Male</label>
        
        <input type="radio" id="female" name="gender" value="female" onChange={genderChangedHandler} onBlur={genderBlurHandler} />
        <label htmlFor="female">Female</label>
        {genderHasError && (
          <p className={classes.errorText}>Gender must be selected.</p>
        )}
      </div>

      {console.log(`age : ${enteredAge}`)}
      {console.log(`date : ${enteredDate}`)}
      {console.log(`selectedCategory : ${selectedCategory}`)}
      {console.log(`selectedsubCategory : ${selectedSubCategory}`)}
      {console.log(`country : ${selectedCountry}`)}
      {console.log(`state : ${selectedState}`)}
      {console.log(`quantity : ${quantity}`)}
      {console.log(`price : ${priceInput}`)}
      {console.log(`cost : ${enteredCost}`)}
      {console.log(`gender : ${gender}`)}

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
