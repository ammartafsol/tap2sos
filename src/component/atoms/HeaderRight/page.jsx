import Image from "next/image";
import React from "react";
import { IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import classes from "./HeaderRight.module.css";
import { IoIosArrowUp } from "react-icons/io";
import { useRouter } from "next/navigation";

const HeaderRight = () => {
  const router = useRouter();
  return (
    <div className={classes?.header}>
      {/* <IoMdNotificationsOutline cursor={"pointer"} fontSize={24} /> */}
      <div>
        <div onClick={() => {router.push("/profile-setting")}} className={classes?.profileParent}>
          <div className={classes?.profile} >
            <Image
              className={classes?.profileImage}
              src={"/Images/app-images/web-image/avatar.png"}
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
      {/* <div className={classes?.arrow}>
        <IoIosArrowUp />
        <IoIosArrowDown />
      </div> */}
    </div>
  );
};

export default HeaderRight;
