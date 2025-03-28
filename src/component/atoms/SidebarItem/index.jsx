"use client";

import React from "react";
import classes from "./SidebarItem.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const SidebarItem = ({ item }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === item.link;

  return (
    <div
      onClick={() => {
        router.push(`${item?.link}`);
      }}
      className={`${classes?.item} ${isActive && classes?.active}`}
    >
      <item.icon className={classes?.icon} />
      <p>{item?.name}</p>
    </div>
  );
};

export default SidebarItem;
