import image from "../../../assets/rightTick.png";
import classes from "./SuccessModal.module.css";
export default function SuccessModal(props) {
 
  return (
    <div className={classes.header}>
      <div>
        <h5>Submission Successful!!!</h5>
      </div>
      <div>
        <img src={image} alt="success" />
      </div>
    </div>
  );
}
