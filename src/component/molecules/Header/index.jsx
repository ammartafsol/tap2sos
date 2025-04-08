import React from "react";
import classes from "./Header.module.css";
import Image from "next/image";
import { FaBars } from "react-icons/fa6";
import HeaderRight from "@/component/atoms/HeaderRight/page";
import { FaChevronCircleRight } from "react-icons/fa";



const Header = ({isCollapsed,setIsCollapsed}) => {
  return (
    <div className={classes?.header}>
      <div className={classes?.logoParent}>
        <div className={isCollapsed?"collapse":classes?.logo}>
          <Image fill src={"Images/app-images/svgs/logo.svg"} alt="logo" />
        </div>
        {
          isCollapsed ?

          <FaChevronCircleRight color="var(--royal-navy-blue)" cursor={"pointer"} onClick={()=>{setIsCollapsed(pre=>!pre)}} fontSize={30} />:
          <FaBars cursor={"pointer"} onClick={()=>{setIsCollapsed(pre=>!pre)}} fontSize={18} />
        }
      </div>
      <HeaderRight />
    </div>
  );
};

export default Header;
