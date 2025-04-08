import React from "react";
import classes from "./BorderWrapper.module.css";
import { Container } from "react-bootstrap";

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
