import Image from "next/image";
import React from "react";
import { IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import classes from "./HeaderRight.module.css";
import { IoIosArrowUp } from "react-icons/io";

const HeaderRight = () => {
  return (
    <div className={classes?.header}>
      <IoMdNotificationsOutline cursor={"pointer"} fontSize={24} />
      <div>
        <div className={classes?.profileParent}>
          <div className={classes?.profile}>
            <Image
              className={classes?.profileImage}
              src={"/images/cms-images/svgs/Avatar.svg"}
              fill
              alt="images"
            />
          </div>
          <div className={classes?.profileDetails}>
            <h4>Phillip Saris</h4>
            <p>Admin</p>
          </div>
        </div>
      </div>
      <div className={classes?.arrow}>
        <IoIosArrowUp />
        <IoIosArrowDown />
      </div>
    </div>
  );
};

export default HeaderRight;
