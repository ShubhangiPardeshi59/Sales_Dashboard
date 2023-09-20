import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={classes.header}>
      <div className={classes.headerName}>{props.headerContent.name}</div>
      <div className={classes.headerSubname}>{props.headerContent.subname}</div>
    </div>
  );
};

export default Header;
