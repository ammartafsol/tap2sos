"use client";

import Button from "@/component/atoms/Button";
import DropDown from "@/component/molecules/DropDown/DropDown";
import AppTable from "@/component/organisms/AppTable/AppTable";
import {
  clinicTableData,
  clinicTableData2,
} from "@/developmentContent/tableBody";
import { ClinicTableHeader } from "@/developmentContent/tableHeader";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import classes from "./ClinicManagement.module.css";
import AddClinicModal from "@/component/molecules/Modal/AddClinicModal";

const ClinicManagement = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div>
        <div className={classes?.user}>
          <div className="h1">User Management</div>
          <div className={classes?.rightTop}>
            <DropDown placeholder={"Filter"} options={[]} />
            <Button
              leftIcon={<IoAdd fontSize={22} />}
              className={classes?.btn}
              label={"Add Clinic"}
              onClick={setShow}
            />
          </div>
        </div>
        <div className={classes?.userTable}>User</div>
        <AppTable
          containerClass={classes?.containerClass}
          tableHeader={ClinicTableHeader}
          data={clinicTableData2}
          renderItem={({ item, key, rowIndex }) => {
            const dataItem = clinicTableData[rowIndex];
            if (key === "select") {
              return <BsThreeDotsVertical fontSize={18} cursor={"pointer"} />;
            }

            return item || "";
          }}
        />
      </div>
      {show && <AddClinicModal show={show} setShow={setShow} />}
    </>
  );
};

export default ClinicManagement;
