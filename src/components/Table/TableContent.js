import ReactDOM from "react-dom";
import {  useSelector } from "react-redux";
import { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import classes from "./Table.module.css";
import EditModal from "../form/modal/editModal/EditModal";
const data_columns = [
  "Id",
  "Date",
  "Country",
  "State",
  "Category",
  "SubCategory",
  "quantity",
  "Cost",
  "Revenue",
  "Edit"
];
export default function TableContent(props) {
 
  const data = useSelector((state) => state.apiDataReducer.filteredData);
  const [showEditModal,setshowEditModal] = useState(false);
  const [currentRowIndex,setCurrentRowIndex] = useState(null);
 
  const [sorted, setSorted] = useState({
    sorted: "revenue",
    reversed: false,
    isSorted: false,
  });
 
  const sortByRevenue = () => {
    setSorted({ sorted: "revenue", reversed: !sorted.false });
    const copyData = data;
    copyData.sort((userA, userB) => {
      if (sorted.reversed) {
        return userA.revenue - userB.revenue;
      }
      return userB.revenue - userA.revenue;
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
        <th key={index} onClick={sortByRevenue}>
          <span>{val}</span>
          {sorted.sorted === "revenue" ? <RenderArrow /> : null}
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
            <td>{obj["cost"]}</td>
            <td>{obj["revenue"]}</td>
            <td data-index={index}><i className={`fa fa-edit`} data-index={index} onClick={openEditModal}></i></td>
          </tr>
        );
      });

    return rows;
  };
 
  const openEditModal = (event) =>{
    setshowEditModal(true);
    setCurrentRowIndex(Number(event.target.dataset.index));
  }

  if(showEditModal == true){
    return <EditModal 
    currentRowIndex={currentRowIndex} 
    setCurrentRowIndex={setCurrentRowIndex}
    setshowEditModal={setshowEditModal}/>
  }
  return (
    <table>
      <colgroup>
            <col  className={classes.colWidth1}></col>
            <col span="4" className={classes.colWidth2}></col>
            <col  className={classes.colWidth3}></col>
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
