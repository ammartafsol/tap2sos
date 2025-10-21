"use client";

import PopOver from "@/component/molecules/PopOver/PopOver";
import AppTable from "@/component/organisms/AppTable/AppTable";
// import { CMS_POPOVER_OPTIONS } from "@/developmentContent/dropdownOptions";
import { CMS_PAGE_HEADER } from "@/developmentContent/tableHeader";
import { Get, Patch } from "@/interceptor/axios-functions";
import { getFormattedParams } from "@/resources/utils/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./CmsViewTemplate.module.css";

const unwantedKeys = ["_id", "updatedAt", "__v", "createdAt"];

export default function CMSViewTemplate() {
  function toCamelCase(str) {
    if (typeof str !== "string") return "";

    return str
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ")
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");
  }

  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(""); // table

  const popoverOptions = [
    {
      label: "Edit",
      value: "edit",
    },
    {
      label: "Delete",
      value: "delete",
    },
  ];

  // get data
  const getData = async (_pg = 1, _s = "") => {
    const route = `cms/pages`;
    setLoading("table");
    const response = await Get({ route });
    console.log("🚀 ~ getData ~ response:", response);
    if (response) {
      console.log("🚀 ~ getData ~ response:", response?.data?.data?.data);
      const res = response?.data?.data?.data;
      let dataArray = Object.keys(res)?.filter(
        (key) => !unwantedKeys.includes(key)
      );
      dataArray = dataArray.map((key) => {
        return {
          pageName: getFormattedParams(key),
          urlKey: key,
        };
      });
      setData(dataArray);
    
    }
    setLoading("");
  };

  // onClickPopover
  const onClickPopover = (label, dataItem = null) => {
    if (label === "Edit") {
      router.push(`/cms/${dataItem?.urlKey}`);
      console.log("🚀 ~ onClickPopover ~ dataItem:", dataItem);
    } else {
      console.log("error", label);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className={classes.cmsView}>
      <Container fluid>
        <Row>
          <Col md={12} className="mt-4">
            <AppTable
              data={data}
              tableHeader={CMS_PAGE_HEADER}
              loading={loading === "table"}
              noDataText="No pages found"
              hasPagination={true}
              renderItem={({ item, key, rowIndex }) => {
                const dataItem = data[rowIndex];
                if (key === "action") {
                  return <PopOver
                    popover={popoverOptions}
                    onClick={(label) => onClickPopover(label, dataItem)}
                  />;
                }
                if (key === "sNo") {
                  return <div>{rowIndex + 1}</div>;
                }
                return item || "";
              }}
            />
          </Col>
        </Row>
      </Container>
    </main>
  );
}
