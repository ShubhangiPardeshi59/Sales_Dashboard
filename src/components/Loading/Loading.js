import classes from "./Loading.module.css";
import loadingimg from "../../assets/loader.gif";
export default function Loading(props) {
  return (
    <div className={classes.card}>
      <div>
        <img src={loadingimg} alt="loading"></img>
      </div>
      <div>Loading...</div>
    </div>
  );
}
