import classes from "../loading/Loading.module.css";
export default function ErrorPage() {
  return (
    <div className={classes.card}>
      <div>
        <h1>An error occured!!</h1>
      </div>
      <div>Can not find this page.</div>
    </div>
  );
}