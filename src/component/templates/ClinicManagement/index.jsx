import Button from "@/component/atoms/Button";
import DropDown from "@/component/molecules/DropDown/DropDown";
import classes from "./ClinicManagement.module.css";
import { IoAdd } from "react-icons/io5";
import React from "react";
import AppTable from "@/component/organisms/AppTable/AppTable";
import { ClinicTableHeader } from "@/developmentContent/tableHeader";
import { clinicTableData, clinicTableData2 } from "@/developmentContent/tableBody";
import { BsThreeDotsVertical } from "react-icons/bs";

const ClinicManagement = () => {
  return (
    <div>
      <div className={classes?.user}>
        <div className="h1">User Management</div>
        <div className={classes?.rightTop}>
          <DropDown placeholder={"Filter"} options={[]} />
          <Button
            leftIcon={<IoAdd fontSize={22} />}
            className={classes?.btn}
            label={"Add Clinic"}
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
  );
};

export default ClinicManagement;
