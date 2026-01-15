"use client";

import React from "react";
import classes from "./SidebarItem.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

const SidebarItem = ({ item,isCollapsed }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === item.link;

  return (
    <div
      onClick={() => {
        router.push(`${item?.link}`);
      }}
      className={`${classes?.item} ${isCollapsed && classes?.itemCollapse} ${isActive && classes?.active}`}
    >
      <item.icon className={classes?.icon} />
      <p className={isCollapsed && 'collapse'}>{item?.name}</p>
    </div>
  );
};

export default SidebarItem;


SidebarItem.propTypes = {
  item: PropTypes.object.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
};
