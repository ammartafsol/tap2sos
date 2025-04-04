import React from "react";
import classes from "./Header.module.css";
import Image from "next/image";
import { FaBars } from "react-icons/fa6";
import HeaderRight from "@/component/atoms/HeaderRight/page";


const Header = () => {
  return (
    <div className={classes?.header}>
      <div className={classes?.logoParent}>
        <div className={classes?.logo}>
          <Image fill src={"Images/app-images/svgs/logo.svg"} alt="logo" />
        </div>
        <FaBars fontSize={18} />
      </div>
      <HeaderRight />
    </div>
  );
};

export default Header;
