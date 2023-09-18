import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import InputField from "./InputFields";
import SuccessModal from "../../modal/SuccessModal";
import classes from "./EditModal.module.css"
export default function EditModal(props) {
  //get data
  return (
    <div className={classes.editModal}>
      <h1>Edit the content</h1>
      <div className={classes.formContainer}>
        <InputField currentRowIndex={props.currentRowIndex} setCurrentRowIndex={props.setCurrentRowIndex}
        setshowEditModal={props.setshowEditModal} />
      </div>
    </div>
  );
}
