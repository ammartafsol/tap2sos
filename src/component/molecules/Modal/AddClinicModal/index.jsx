"use client";
import classes from "./AddClinicModal.module.css";
import { useFormik } from "formik";
import ModalSkeleton from "@/component/atoms/ModalSkeleton/ModalSkeleton";
import { Input } from "@/component/atoms/Input";
import Button from "@/component/atoms/Button";
import { addClinicSchema } from "@/schema/addClinicSchema";
import { Patch, Post } from "@/interceptor/axios-functions";
import RenderToast from "@/component/atoms/RenderToast";
import { useEffect, useState } from "react";

const AddClinicModal = ({
  show,
  setShow,
  getData,
  setSearch,
  editData,
  isEdit,
  setIsEdit,
  setIsEditData,
  setEditData,
}) => {
  const [loading, setLoading] = useState("");

  const addClinicFormik = useFormik({
    initialValues: {
      clinicName: "",
      email: "",
      phoneNumber: "",
      longitude: 67.0726,
      latitude: 24.8994,
    },
    validationSchema: addClinicSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setLoading("loading");
  
    const response = isEdit
      ? await Patch({ route: `admin/update-clinic/${editData?.slug}`, data: values })
      : await Post({ route: "admin/create-clinic", data: values });
  
    setLoading("");
  
    if (response?.data?.status === 200) {
      RenderToast({
        type: "success",
        message: `Clinic ${isEdit ? "updated" : "added"} successfully`,
      });
  
      setShow(false);
      setSearch("");
      getData();
      setIsEdit(false);
      setEditData(false);
      addClinicFormik.resetForm();
    }
    
  };
  

  const onCancel = () => {
    setShow(false);
    setIsEdit(false);
    addClinicFormik.resetForm();
  };

  useEffect(() => {
    if (isEdit) {
      addClinicFormik.setFieldValue("clinicName", editData?.clinicName);
      addClinicFormik.setFieldValue("email", editData?.email);
      addClinicFormik.setFieldValue("phoneNumber", editData?.phoneNumber);
    }
  }, []);

  return (
    <ModalSkeleton
      header={`${isEdit ? "Edit" : "Add"} Clinic`}
      show={show}
      setShow={setShow}
    >
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
          disabled={isEdit}
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
          <Button label="Cancel" variant="outlined" onClick={onCancel} />
          <Button
            disabled={loading === "loading"}
            label={`${
              loading === "loading"
                ? "loading..."
                : `${isEdit ? "Edit" : "Add"} Clinic`
            }`}
            type="submit"
          />
        </div>
      </form>
    </ModalSkeleton>
  );
};

export default AddClinicModal;
