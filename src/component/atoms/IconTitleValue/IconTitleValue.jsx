import React from "react";
import classes from "./IconTitleValue.module.css";
import PropTypes from "prop-types";
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

IconTitleValue.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  value: PropTypes.string,
};
