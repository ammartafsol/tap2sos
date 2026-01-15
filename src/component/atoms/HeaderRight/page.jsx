import Image from "next/image";
import React from "react";
import classes from "./HeaderRight.module.css";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const HeaderRight = () => {
  const router = useRouter();
  const {user} = useSelector((state) => state?.authReducer);
  return (
    <div className={classes?.header}>
      {/* <IoMdNotificationsOutline cursor={"pointer"} fontSize={24} /> */}
      <div>
        <button
          type="button"
          onClick={() => {
            router.push("/profile-setting");
          }}
          className={classes?.profileParent}
        >
          <div className={classes?.profile} >
            <Image
              className={classes?.profileImage}
              src={"/Images/app-images/web-image/avatar.png"}
              fill
              alt="images"
            />
          </div>
          <div className={classes?.profileDetails}>
            <h4>{`${user?.firstName} ${user?.lastName}`}</h4>
            <p>{user?.role}</p>
          </div>
        </button>
      </div>
      {/* <div className={classes?.arrow}>
        <IoIosArrowUp />
        <IoIosArrowDown />
      </div> */}
    </div>
  );
};

export default HeaderRight;
