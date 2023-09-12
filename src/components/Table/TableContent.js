import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import classes from "./Table.module.css";
const data_columns = [
  "Index",
  "Date",
  "Year",
  "Month",
  "Country",
  "State",
  "Product Category",
  "Sub Category",
  "quantity",
  "Cost",
  "Revenue",
];
export default function TableContent(props) {
  // const dispatch = useDispatch();
  const data = useSelector((state) => state.apiDataReducer.filteredData);
  // const sorting = useSelector((state)=>state.apiSorting);
  //console.log("sorting is ",sorting)
  const [sorted, setSorted] = useState({
    sorted: "revenue",
    reversed: false,
    isSorted: false,
  });
  //const [sortedDate,setSortedDate] = useState({sorted:"date",reversed:false});
  //const [sortedCountry,setSortedCountry] = useState({sorted:"country",reversed:false});

  //const [order,setOrder] = useState(null);
  //const data = useSelector((state) => state.apiDataReducer.data);
  // const getSortedData = (sorted) =>{
  //   const temp = data;
  //   temp.sort((a, b) => {
  //     const valueA = a[sorted.sorted];
  //     const valueB = b[sorted.sorted];

  //     if (typeof valueA === 'number' && typeof valueB === 'number') {
  //         return sorted.reversed === true ? valueA - valueB : valueB - valueA;
  //     }
  //     else{
  //         const stringA = String(valueA).toLowerCase();
  //         const stringB = String(valueB).toLowerCase();
  //         return sorted.reversed === true ? stringA.localeCompare(stringB) : stringB.localeCompare(stringA);
  //     }
  // });
  // return temp;
  //  }
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
  // const sortByRevenue = () =>{
  //   setSorted({sorted:"revenue",reversed:!sorted.false});
  //   const copyData = getSortedData(sorted);
  //   dispatch({type:'sort_data',value:copyData})
  // }
  const renderArrow = () => {
    if (sorted.reversed) {
      return <FaArrowUp />;
    }
    return <FaArrowDown />;
  };

  console.log("in table content filter data is ", data);
  const GetColumns = () => {
    const tempCol = data_columns.map(function (val, index) {
      return (
        <th key={index} onClick={sortByRevenue}>
          <span>{val}</span>
          {sorted.sorted === "revenue" ? renderArrow() : null}
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
            <td>{obj["index"] + 1}</td>
            <td>{obj["date"]}</td>
            <td>{obj["year"]}</td>
            <td>{obj["month"]}</td>
            <td>{obj["country"]}</td>
            <td>{obj["state"]}</td>
            <td>{obj["product_category"]}</td>
            <td>{obj["sub_category"]}</td>
            <td>{obj["quantity"]}</td>
            <td>{obj["cost"]}</td>
            <td>{obj["revenue"]}</td>
          </tr>
        );
      });

    return rows;
  };
  return (
    <table>
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
