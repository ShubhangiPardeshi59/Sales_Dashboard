import MapChart from "../charts/MapChart"
import classes from "./Sales.module.css"
export default function Sales(){
    return(
        <div className={classes.salesPage}>
            <MapChart />
        </div>
    )
}