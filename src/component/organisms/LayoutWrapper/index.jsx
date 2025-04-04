import Headers from "@/component/molecules/Header";
import React from "react";
import { Container } from "react-bootstrap";
import classes from "./LayoutWrapper.module.css";
import Sidebar from "@/component/molecules/Sidebar/page";

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <Headers />
      <div className={classes.child}>
        <div className={classes?.subChild}>
        <div className={classes?.sidebar}>
          <Sidebar />
        </div>
        <div className={`${"fullHeight padding"} ${classes.children}`}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default LayoutWrapper;
