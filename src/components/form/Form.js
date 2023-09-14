import classes from "./Form.module.css"
import SimpleInput from "./fields/SimpleInput"

export default function Form(props){
    return(
        <div className={classes.inventoryPage}>
           <div className={classes.formContainer}>
                <SimpleInput fetchDataHandler={props.fetchDataHandler} />
           </div>
        </div>
    )
}
