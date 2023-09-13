import classes from "./Form.module.css"
import SimpleInput from "./fields/SimpleInput"

export default function Form(){
    return(
        <div className={classes.inventoryPage}>
           <div className={classes.formContainer}>
                <SimpleInput />
           </div>
        </div>
    )
}


// <div>
//                     <label name="date" htmlFor = "date">Date</label>
//                     <input type ="date" id="date"></input>
//                 </div>
//                 <div>
//                     <label name="age" htmlFor = "age">Age</label>
//                     <input type ="text" id="age"></input>
//                 </div>
//                 <div>
//                     <label name="gender" htmlFor = "gender">Gender</label>
//                     <input type ="radio" id="gender"></input>
//                 </div>
//                 <div>
//                     {/* <select name="country" id="country" onChange={handleYearChange}> */}
//                     <label name="country" htmlFor = "country">Country</label>
//                     <select name="country" id="country">
//                         <option value="United States">United States</option>
//                         <option value="France">France</option>
//                         <option value="United Kingdom">United Kingdom</option>
//                         <option value="Germany">Germany</option>
//                         <option value="India">Germany</option>
//                     </select>
//                 </div>
//                 <div>
//                     {/* <select name="country" id="country" onChange={handleYearChange}> */}
//                     <label name="state" htmlFor = "state">State</label>
//                     <select name="state" id="state">
//                         <option value="Washington">Washington</option>
//                         <option value="California">California</option>
//                         <option value="Maharashtra">Maharashtra</option>
//                         <option value="Karnataka">Karnataka</option>
//                     </select>
//                 </div>
//                 <div>
//                     {/* <select name="country" id="country" onChange={handleYearChange}> */}
//                     <label name="category" htmlFor = "category">Category</label>
//                     <select name="category" id="category">
//                         <option value="Accessories">Accessories</option>
//                         <option value="Clothing">Clothing</option>
//                         <option value="Bikes">Bikes</option>
//                     </select>
//                 </div>
//                 <div>
//                     {/* <select name="country" id="country" onChange={handleYearChange}> */}
//                     <label name="sub-category" htmlFor = "sub-category">Sub category</label>
//                     <select name="sub-category" id="sub-category">
//                         <option value="Accessories">Accessories</option>
//                         <option value="Clothing">Clothing</option>
//                         <option value="Bikes">Bikes</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label name="quantity" htmlFor = "quantity">Quantity</label>
//                     <input type ="text" id="quantity"></input>
//                 </div>
//                 <div>
//                     <label name="unit_cost" htmlFor = "unit_cost">Unit Cost</label>
//                     <input type ="text" id="unit_cost"></input>
//                 </div>
//                 <div>
//                     <label name="unit_price" htmlFor = "unit_price">Unit Price</label>
//                     <input type ="text" id="unit_price"></input>
//                 </div>
//                 <button type="submit" className="btn">
//                      Submit
//                  </button>
//                  <button  className="btn">
//                     Reset
//                 </button>