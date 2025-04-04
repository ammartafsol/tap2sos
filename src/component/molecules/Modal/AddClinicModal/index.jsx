"use client";
import classes from "./AddClinicModal.module.css";
import { useFormik } from "formik";
import ModalSkeleton from "@/component/atoms/ModalSkeleton/ModalSkeleton";
import { Input } from "@/component/atoms/Input";
import Button from "@/component/atoms/Button";
import { addClinicSchema } from "@/schema/addClinicSchema";
import { Post } from "@/interceptor/axios-functions";
import RenderToast from "@/component/atoms/RenderToast";
import { useState } from "react";

const AddClinicModal = ({ show, setShow, getData, setSearch }) => {
  const [loading, setLoading] = useState("");

  const addClinicFormik = useFormik({
    initialValues: {
      clinicName: "",
      email: "",
      phoneNumber: "",
      longitude:67.0726,
      latitude: 24.8994,
    },
    validationSchema: addClinicSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setLoading("loading");
    const response = await Post({ route: "admin/create-clinic", data: values });
    setLoading("");
    if (response?.data?.status === 200) {
      RenderToast({ type: "success", message: "Clinic added successfully" });
      setShow(false);
      setSearch("");
      getData();
      addClinicFormik.resetForm();
    }
  };

  return (
    <ModalSkeleton header={"Add Clinic"} show={show} setShow={setShow}>
      <form
        onSubmit={addClinicFormik.handleSubmit}
        className={classes.addFormField}
      >
        <Input
          label="Clinic Name"
          placeholder="Enter clinic name"
          name="clinicName"
          value={addClinicFormik.values.clinicName}
          setter={(e) => addClinicFormik.setFieldValue("clinicName", e)}
          errorText={
            addClinicFormik.touched.clinicName &&
            addClinicFormik.errors.clinicName
          }
        />

        <Input
          label="Email Address"
          placeholder="example@example.com"
          name="email"
          type="email"
          value={addClinicFormik.values.email}
          setter={(e) => addClinicFormik.setFieldValue("email", e)}
          errorText={
            addClinicFormik.touched.email && addClinicFormik.errors.email
          }
        />

        <Input
          label="Phone Number"
          placeholder="Enter phone number"
          name="phoneNumber"
          value={addClinicFormik.values.phoneNumber}
          type={"number"}
          setter={(e) => addClinicFormik.setFieldValue("phoneNumber", e)}
          errorText={
            addClinicFormik.touched.phoneNumber &&
            addClinicFormik.errors.phoneNumber
          }
        />
        <div className={classes.buttonDiv}>
          <Button
            label="Cancel"
            variant="outlined"
            onClick={() => setShow(false)}
          />
          <Button
            disabled={loading === "loading"}
            label={`${loading === "loading" ? "loading..." : "Add Clinic"}`}
            type="submit"
          />
        </div>
      </form>
    </ModalSkeleton>
  );
};

export default AddClinicModal;
