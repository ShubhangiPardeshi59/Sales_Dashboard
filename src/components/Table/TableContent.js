import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import classes from "./Table.module.css";

const data_columns = [
  "Id",
  "Date",
  "Country",
  "State",
  "Category",
  "SubCategory",
  "quantity",
  "Cost",
  "Price",
  "Edit",
];
export default function TableContent(props) {
  const data = useSelector((state) => state.apiDataReducer.filteredData);

  const [sorted, setSorted] = useState({
    sorted: "",
    reversed: false,
    isSorted: false,
  });

  const sort = (event) => {
    const column = event.target.dataset.col;
   console.log("target clicked is ",event.target.dataset.col);
    if(sorted.isSorted === false){
      setSorted({...sorted, sorted: {column}, isSorted: true});
    }
    else{
      if(sorted.reversed === false){
        setSorted({...sorted, sorted: {column}, reversed: true});
      }
      else{
        setSorted({sorted: "", reversed: false, isSorted: false});
      }
    }

   
    const copyData = data;
    copyData.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];

      if(typeof(valA) === "number" && typeof(valB) === "number"){
        if (sorted.reversed) {
          return valA.revenue - valB.revenue;
        }
        return valB.revenue - valA.revenue;
      }
      else{
        const stringA = String(valA).toLowerCase();
        const stringB = String(valB).toLowerCase();
        if (sorted.reversed) {
          stringA.localeCompare(stringB)
        }
        stringB.localeCompare(stringA);
      }
      
    });
    return copyData;
  };

  const RenderArrow = () => {
    if (sorted.reversed) {
      return <FaArrowUp />;
    }
    return <FaArrowDown />;
  };

  const GetColumns = () => {
    const tempCol = data_columns.map(function (val, index) {
      return (
        <th key={index} onClick={sort} data-col = {val}>
          <span>{val}</span>
          {sorted.sorted === val ? <RenderArrow /> : null}
        </th>
      );
    });
    return tempCol;
  };

  const GetRows = () => {
    const rows = data
      .slice(props.startIndex, props.endIndex)
      .map((obj, index) => {
        return (
          <tr key={index}>
            <td>{obj["id"] + 1}</td>
            <td>{obj["date"]}</td>
            <td>{obj["country"]}</td>
            <td>{obj["state"]}</td>
            <td>{obj["product_category"]}</td>
            <td>{obj["sub_category"]}</td>
            <td>{obj["quantity"]}</td>
            <td>{obj["unit_cost"]}</td>
            <td>{obj["unit_price"]}</td>
            <td data-index={index}>
              <Link to={`/table/${index}`}>
                <i
                  className={`fa fa-edit`}
                ></i>
              </Link>
            </td>
          </tr>
        );
      });

    return rows;
  };

  return (
    <table>
      <colgroup>
        <col className={classes.colWidth1}></col>
        <col span="4" className={classes.colWidth2}></col>
        <col className={classes.colWidth3}></col>
        <col span="4" className={classes.colWidth4}></col>
      </colgroup>
      <thead>
        <tr>
          <GetColumns />
        </tr>
      </thead>
      <tbody>
        {data.length !== 0 ? (
         
           <GetRows />
           
        ) : (
          <tr>
            <td colSpan={11}>
              <p className={classes.message}>No data found</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
