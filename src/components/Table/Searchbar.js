import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Table.module.css";
export default function SearchBar() {
  const data = useSelector((state) => state.apiDataReducer.data);
  const dispatch = useDispatch();
  const searchedText = useRef("hi");
  //const [text,setText] = useState("");

  const getData = () => {
    searchedText.current.style.backgroundColor = "#8DDFA8";
    let userInput = searchedText.current.value;
    
    let matchingObjects = data.filter((obj) => {
      // Combine all values of the object into a single string for searching
      const combinedValues = Object.values(obj).join(" ").toLowerCase();
      return combinedValues.includes(userInput.toLowerCase());
    });

    dispatch({ type: "filter_data", value: matchingObjects });
  };

  const reset = () => {
    searchedText.current.value = "";
    searchedText.current.style.backgroundColor = "";
    dispatch({ type: "filter_data", value: data });
  };

  return (
    <>
      <input
        type="text"
        ref={searchedText}
        placeholder="Search.."
        name="search"
      />
      <button type="button" onClick={getData} title="Click to search" className={classes.button1}>
        <i className={`fa fa-search ${classes.faSearchIcon}`}></i>
      </button>
      <button type="button" onClick={reset} title="Click to clear" className={classes.button2}>
        <i className={`fa fa-remove ${classes.faRemoveIcon}`}></i>
      </button>
    </>
  );
}
