import { Skeleton } from "@mui/material";
import React, { useMemo } from "react";
import classes from "./TableSkeleton.module.css";
import { mergeClass } from "@/resources/utils/helper";
import PropTypes from "prop-types";

function TableSkeleton({ rowsCount = 10, colsCount = 5 }) {
  const rowKeys = useMemo(
    () =>
      Array.from({ length: rowsCount }, () =>
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`
      ),
    [rowsCount]
  );

  const colKeys = useMemo(
    () =>
      Array.from({ length: colsCount }, () =>
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`
      ),
    [colsCount]
  );

  return (
    <div className={mergeClass(`${classes?.tableBodyContainer}`)}>
      <table>
        <tbody>
          {rowKeys.map((rowKey) => (
            <tr key={rowKey}>
              {colKeys.map((colKey) => (
                <td
                  key={colKey}
                  style={{
                    width: `${100 / colsCount}%`,
                    paddingBlock: "0px",
                  }}
                >
                  <Skeleton height={"70px"} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableSkeleton;

TableSkeleton.propTypes = {
  rowsCount: PropTypes.number,
  colsCount: PropTypes.number,
};