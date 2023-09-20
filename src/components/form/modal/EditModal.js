import InputField from "./InputFields";
import classes from "./EditModal.module.css"
import { useParams } from "react-router-dom";
export default function EditModal(props) {
  const {id} = useParams();
  //get data
  return (
    <div className={classes.editModal}>
      <h2>Edit the content</h2>
      <div className={classes.formContainer}>
        <InputField currentRowIndex={id}  />
      </div>
    </div>
  );
}
