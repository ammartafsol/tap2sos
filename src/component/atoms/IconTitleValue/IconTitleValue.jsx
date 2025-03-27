import React from "react";
import classes from "./IconTitleValue.module.css";

export default function IconTitleValue({ children, title = "", value = "" }) {
  return (
    <div className={classes.flex}>
      <div className={classes.circle}>{children}</div>
      <div>
        <div className={classes.phone}>{title}</div>
        <div className={classes.phone}>{value}</div>
      </div>
    </div>
  );
}
