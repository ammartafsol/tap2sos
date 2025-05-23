"use client";
import Headers from "@/component/molecules/Header";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import classes from "./LayoutWrapper.module.css";
import Sidebar from "@/component/molecules/Sidebar/page";

const LayoutWrapper = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <Headers isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={classes.child}>
        <div className={classes?.subChild}>
        <div className={`${classes?.sidebar} ${isCollapsed && classes?.sidebarCollapse}`}>
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </div>
        <div className={`${"fullHeight padding"} ${classes.children}`}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default LayoutWrapper;
