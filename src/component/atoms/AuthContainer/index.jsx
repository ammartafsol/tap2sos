import React, { Children } from "react";
import classes from "./AuthContainer.module.css";
import Image from "next/image";
import BorderWrapper from "../BorderWrapper";

const AuthContainer = ({ children }) => {
  return (
    <div className={classes.AuthContainer}>
      <BorderWrapper containerClass={"authCard"}>
        <div className={"logo"}>
          <Image src={"/images/app-images/svgs/logo.svg"} fill alt="logo" />
        </div>
        {children}
      </BorderWrapper>
    </div>
  );
};

export default AuthContainer;
