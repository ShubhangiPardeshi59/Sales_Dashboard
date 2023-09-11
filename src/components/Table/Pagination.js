import React, { useEffect, useState } from "react";
import classes from "./Table.module.css";


export default function Pagination(props) {
  const { currentPage, setCurrentPage, dataLength } = props;
  const rowsPerPage = 7;

  const totalPages = Math.ceil(dataLength / rowsPerPage);
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    setStartPage(Math.floor((currentPage - 1) / rowsPerPage) * rowsPerPage + 1);
  }, [currentPage, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const RenderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 0; i < Math.min(rowsPerPage, totalPages); i++) {
      const pageNumber = startPage + i;
      if (pageNumber <= totalPages) {
        pageNumbers.push(
          <a
            key={pageNumber}
            href="#"
            value={pageNumber}
            className={currentPage === pageNumber ? classes.active : ""}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        );
      }
    }
    return pageNumbers;
  };

  const RenderPrevButton = () => (
    <a
      href="#"
      className={classes.prev}
      onClick={() => { handlePageChange(currentPage - 1) }}
      disabled={currentPage === 1}
    >
      Prev
    </a>
  );

  const RenderNextButton = () => (
    <a
      href="#"
      onClick={() => { handlePageChange(currentPage + 1) }}
      disabled={currentPage === totalPages}
    >
      Next
    </a>
  );

  return (
    <div className={classes.pagination}>
      {(currentPage !== 1 && dataLength !== 0 )&& <RenderPrevButton />}
      <RenderPageNumbers />
      {(currentPage !== totalPages && dataLength !== 0 ) && <RenderNextButton />}
    </div>
  );
}
