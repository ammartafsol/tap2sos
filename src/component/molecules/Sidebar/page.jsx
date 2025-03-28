"use client";
import React, { useState } from "react";
import classes from "./Sidebar.module.css";
import SidebarItem from "@/component/atoms/SidebarItem";
import { sidebarData } from "@/developmentContent/developmentData/sidebarData";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";


const Sidebar = () => {
    const router = useRouter();
  return (
    <div className={classes?.Sidebar}>
        <div className={classes?.sidebarItem}>
      {sidebarData?.map((item) => {
        return <SidebarItem item={item} key={item._id} />;
      })}
      </div>
      <div onClick={()=>{router.push('auth/sign-in')}} className={classes?.logout}>
        <IoLogOutOutline className={classes?.logoutIcon} />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
