import classes from "./Card.module.css";

export default function Card(props) {
  return (
    <>
      <div className={classes.cardImg}>
        <img src={props.image} alt="cart image"></img>
      </div>
      <div className={classes.textContainer}>
        <div className={classes.cardTitle}>{props.title}</div>
        <div className={classes.cardValue}>{props.value}</div>
      </div>
    </>
  );
}
