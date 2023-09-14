import { useSelector } from "react-redux";
import { useState } from "react";
import TableContent from "./TableContent";
import classes from "./Table.module.css";
import SearchBar from "./Searchbar";
import Pagination from "./Pagination";

const paginationStore = {
  itemsPerPage : 8,
  pages:10,
}

export default function Table() {
  const data = useSelector((state) => state.apiDataReducer.filteredData);
  // const data = useSelector((state) => state.apiDataReducer.data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = paginationStore.itemsPerPage;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  //const currentItems = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calculate the range of pages to display in the pagination

  return (
    <div className={classes.tableContainer}>
      <div className={classes.searchContainer}>
        <SearchBar />
      </div>
      <div className={classes.tableBody}>
        <TableContent startIndex={startIndex} endIndex={endIndex} />
      </div>
      <div className={classes.tableFooter}>
        <Pagination
          dataLength={data.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          itemsPerPage = {itemsPerPage}
          pages = {paginationStore.pages}
        />
      </div>
    </div>
  );
}

// const GetRows = (size = 10) => {
//   const rows = data.slice(0, size).map((obj, index) => {
//     const row = Object.values(obj).map((val, colIndex) => (
//       <td key={colIndex}>{val}</td>
//     ));
//     return <tr key={index}>{row}</tr>;
//   });
//   return rows;
// };
