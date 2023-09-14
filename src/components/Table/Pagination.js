import React, { useEffect, useState } from "react";
import classes from "./Table.module.css";

export default function Pagination(props) {
  const [startPage, setStartPage] = useState(1);
 
  const { currentPage, setCurrentPage, dataLength,totalPages,pages } = props;

  useEffect(() => {
    setStartPage(
      Math.floor((currentPage - 1) / pages) * pages + 1
    );
  }, [currentPage, pages]);

  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.dataset.value));
  };


  const RenderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 0; i < Math.min(pages, totalPages); i++) {
      const pageNumber = startPage + i;
      if (pageNumber <= totalPages) {
        pageNumbers.push(
          <a
            key={pageNumber}
            href="#"
            data-value={pageNumber}
            className={currentPage === pageNumber ? classes.active : ""}
            onClick={handlePageChange}
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
      data-value={currentPage - 1}
      onClick={handlePageChange}
    >
      Prev
    </a>
  );

  const RenderNextButton = () => (
    <a
      href="#"
      data-name="next"
      data-value={currentPage + 1}
      onClick={handlePageChange}
    >
      Next
    </a>
  );

  return (
    <div className={classes.pagination}>
      {currentPage !== 1 && dataLength !== 0 && <RenderPrevButton />}
      <RenderPageNumbers />
      {currentPage !== totalPages && dataLength !== 0 && <RenderNextButton />}
    </div>
  );
}
