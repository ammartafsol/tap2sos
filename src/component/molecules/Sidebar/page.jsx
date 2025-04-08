"use client";
import React, { useState } from "react";
import classes from "./Sidebar.module.css";
import SidebarItem from "@/component/atoms/SidebarItem";
import { sidebarData } from "@/developmentContent/developmentData/sidebarData";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { signOutRequest } from "@/store/auth/authSlice";

const Sidebar = ({ isCollapsed }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const signout = () => {
    Cookies.remove("_xpdx_u");
    Cookies.remove("_xpdx");
    router.push("/auth/sign-in");
    dispatch(signOutRequest());
  };
  return (
    <div className={classes?.Sidebar}>
      <div className={classes?.sidebarItem}>
        {sidebarData?.map((item) => {
          return (
            <SidebarItem isCollapsed={isCollapsed} item={item} key={item._id} />
          );
        })}
      </div>
      <div
        onClick={() => {
          signout();
        }}
        className={classes?.logout}
      >
        <IoLogOutOutline className={classes?.logoutIcon} />
        <div className={isCollapsed && "collapse"}>
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
