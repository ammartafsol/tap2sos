import React, { useState } from "react";
import classes from "./AreSureModal.module.css";
import { Col, Row } from "react-bootstrap";
import Button from "../../../atoms/Button";
import ModalSkeleton from "../../../atoms/ModalSkeleton/ModalSkeleton";
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import RenderToast from "@/component/atoms/RenderToast";

export default function AreSureModal({
  show,
  setShow,
  message,
  onYes,
  isLoading,
  showReason = false,
}) {
  console.log("showReason ", showReason);
  const [reason, setReason] = useState("");
  return (
    <ModalSkeleton width={70} show={show} setShow={setShow}>
      <h4 className={`${"heading1"} ${classes.heading}`}>Are you Sure?</h4>
      <p>{message && message}</p>

      {showReason && (
        <Col md={12} className="mb-3">
          <TextArea
            value={reason}
            setter={setReason}
            placeholder={"Enter Reason"}
          />
        </Col>
      )}
      <Row>
        <div className={classes.parentBtn}>
          <Button
            disabled={isLoading}
            onClick={() => setShow(false)}
            className={classes.cancel}
            label={"No"}
          />
          <Button
            disabled={isLoading}
            className={classes.send}
            label={isLoading ? "Please Wait..." : "Yes"}
            onClick={() => {
              if (showReason) {
                if (reason?.trim() === "") {
                  return RenderToast({
                    message: "Please enter reason",
                    type: "error",
                  });
                }
                onYes(reason);
              } else {
                onYes();
              }
            }}
          />
        </div>
      </Row>
    </ModalSkeleton>
  );
}
