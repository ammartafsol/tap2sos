"use client";
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import classes from "./paginationComponent.module.css";
import { RECORDS_LIMIT } from "@/const";
import PropTypes from "prop-types";
export default function Pagination({
  totalRecords = 50,
  currentPage = 1,
  setCurrentPage = () => {},
}) {
  const totalPages = Math.ceil(totalRecords / RECORDS_LIMIT);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.text}
      >{`Showing ${currentPage} of ${totalPages}`}</div>
      <div className="d-flex gap-2">
        <button
          type="button"
          onClick={goToPrevPage}
          disabled={currentPage <= 1}
          className={classes.iconBox}
          aria-label="Previous page"
        >
          <MdKeyboardArrowLeft size={20} />
        </button>

        <button
          type="button"
          onClick={goToNextPage}
          disabled={currentPage >= totalPages}
          className={classes.iconBox}
          aria-label="Next page"
        >
          <MdOutlineKeyboardArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}


Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};