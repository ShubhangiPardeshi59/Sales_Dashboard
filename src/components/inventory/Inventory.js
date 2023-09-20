import DirectedTree from "../charts/DirectedTree";
import classes from "./Inventory.module.css"
export default function Sales(){
    return(
        <div className={classes.inventoryPage}>
            <DirectedTree />
        </div>
    )
}