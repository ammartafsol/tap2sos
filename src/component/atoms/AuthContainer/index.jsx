"use client";

import React from "react";
import classes from "./AuthContainer.module.css";
import Image from "next/image";
import BorderWrapper from "../BorderWrapper";
import PropTypes from "prop-types";
import Button from "../Button";
import { usePathname, useRouter } from "next/navigation";

const AuthContainer = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const showBackToLogin = pathname !== "/auth/sign-in";

  return (
    <div className={classes.AuthContainer}>
      {showBackToLogin && (
        <div className={classes.backToLoginWrap}>
          <Button
            type="button"
            className={classes.backToLogin}
            label="Back to Login"
            onClick={() => router.push("/auth/sign-in")}
          />
        </div>
      )}
      <BorderWrapper containerClass={"authCard"}>
        <div className={"logo"}>
          <Image src={"/Images/app-images/svgs/logo.svg"} fill alt="logo" />
        </div>
        {children}
      </BorderWrapper>
    </div>
  );
};

export default AuthContainer;



AuthContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
