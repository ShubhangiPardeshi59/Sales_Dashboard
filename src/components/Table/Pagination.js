import React, { useEffect, useState } from "react";
import classes from "./Table.module.css";

export default function Pagination(props) {
  const [startPage, setStartPage] = useState(1);
 
  const { currentPage, setCurrentPage, dataLength, itemsPerPage } = props;

  const totalPages = Math.ceil(dataLength / itemsPerPage);

  useEffect(() => {
    setStartPage(
      Math.floor((currentPage - 1) / itemsPerPage) * itemsPerPage + 1
    );
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (e) => {
    //setState({[e.target.dataset.name]: e.target.dataset.value})
    setCurrentPage(e.target.dataset.value);
  };


  const RenderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 0; i < Math.min(itemsPerPage, totalPages); i++) {
      const pageNumber = Number(startPage + i);
      if (pageNumber <= totalPages) {
        pageNumbers.push(
          <a
            key={pageNumber}
            href="#"
            data-value={pageNumber}
            className={currentPage == pageNumber ? classes.active : ""}
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
      data-value={Number(currentPage) - 1}
      onClick={handlePageChange}
      disabled={currentPage === 1}
    >
      Prev
    </a>
  );

  const RenderNextButton = () => (
    <a
      href="#"
      data-name="next"
      data-value={Number(currentPage) + 1}
      onClick={handlePageChange}
      disabled={currentPage === totalPages}
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
