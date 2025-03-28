import { Skeleton } from "@mui/material";
import React from "react";
import classes from "./TableSkeleton.module.css";
import { mergeClass } from "@/resources/utils/helper";

function TableSkeleton({ rowsCount = 10, colsCount = 5 }) {
  const rows = Array(rowsCount).fill(0);
  const cols = Array(colsCount).fill(0);

  return (
    <div className={mergeClass(`${classes?.tableBodyContainer}`)}>
      <table>
        <tbody>
          {rows.map((rowItem, rowIndex) => (
            <tr key={rowIndex}>
              {cols?.map((item, colIndex) => (
                <td
                  key={colIndex}
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
