import React from "react";
import classes from "./DashboardTemplate.module.css";
import StatesCard from "@/component/molecules/StatesCard/StatesCard";
import { Col, Row } from "react-bootstrap";
import { statesCardsData } from "@/developmentContent/developmentData/cardsData";
import LineChart from "@/component/molecules/Chart";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import DropDown from "@/component/molecules/DropDown/DropDown";
import AppTable from "@/component/organisms/AppTable/AppTable";
import { BsThreeDotsVertical } from "react-icons/bs";
import { clinicTableData } from "@/developmentContent/tableBody";
import { ClinicTableHeader } from "@/developmentContent/tableHeader";

const DashboardTemplate = () => {
  return (
    <div>
      <div className="h1">Dashboard</div>

      <Row className={classes?.statesMain}>
        {statesCardsData?.map((item) => {
          return (
            <Col key={item._id} md="6" lg="4">
              <StatesCard item={item} />
            </Col>
          );
        })}
      </Row>
      <BorderWrapper containerClass={classes?.BorderWrapper}>
        <div className={classes?.header}>
          <div className="h2">Patient Data Retrieval Activity</div>
          <DropDown />
        </div>
        <div className={classes?.lineChart}>
          <LineChart />
        </div>
      </BorderWrapper>
      <BorderWrapper containerClass={classes?.BorderWrapper}>
        <div className={classes?.users}>
          <div className="h2">Users</div>
        </div>
        <AppTable
          tableHeader={ClinicTableHeader}
          data={clinicTableData}
          renderItem={({ item, key, rowIndex }) => {
            const dataItem = clinicTableData[rowIndex];
            if (key === "select") {
              return <BsThreeDotsVertical fontSize={18} cursor={"pointer"} />;
            }

            return item || "";
          }}
        />
      </BorderWrapper>
    </div>
  );
};

export default DashboardTemplate;
