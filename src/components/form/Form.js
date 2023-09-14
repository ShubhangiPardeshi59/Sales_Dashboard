import  ReactDOM  from "react-dom"
import {  useState,useEffect } from "react"
import classes from "./Form.module.css"
import SimpleInput from "./fields/SimpleInput"
import SuccessModal from "./modal/SuccessModal"


export default function Form(props){
    const [isSubmitted,setIsSubmitted] = useState(false);
    //const [show,setShow] = useState(true);
    useEffect(() => {
        const timeOut = setTimeout(() => {
          setIsSubmitted(false);
          console.log("is submitted val ", isSubmitted);
        }, 3000);
       
        return () => {clearTimeout(timeOut)};
      }, [isSubmitted]);
    
    
    return(
        <div className={classes.inventoryPage}>
           <div className={classes.formContainer}>
                <SimpleInput fetchDataHandler={props.fetchDataHandler} setIsSubmitted={setIsSubmitted} isSubmitted={isSubmitted}/>
                {isSubmitted && ReactDOM.createPortal(<SuccessModal setIsSubmitted={setIsSubmitted} isSubmitted={isSubmitted}                                                                                                                                                                                                                                           />,document.getElementById("success-modal-root"))}  
           </div>
           {/* <SuccessModal /> */}
        </div>
    )
}
