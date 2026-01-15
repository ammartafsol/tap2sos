import React from "react";
import PropTypes from "prop-types";
import classes from "./BorderWrapper.module.css";

export default function BorderWrapper({
  children,
  darkBorder = false,
  containerClass = "",
}) {
  return (
    <div
      className={`${classes.mainContainer} ${
        darkBorder && classes.borderDark
      } ${containerClass}`}
    >
      {children}
    </div>
  );
}

BorderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  darkBorder: PropTypes.bool,
  containerClass: PropTypes.string,
};
