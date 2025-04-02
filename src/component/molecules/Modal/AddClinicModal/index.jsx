import classes from "./AddClinicModal.module.css";
import { useFormik } from "formik";
import ModalSkeleton from "@/component/atoms/ModalSkeleton/ModalSkeleton";
import { Input } from "@/component/atoms/Input";
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import Button from "@/component/atoms/Button";
import { addClinicSchema } from "@/schema/addClinicSchema";
import DateInput from "../../DateInput";
import DropDown from "../../DropDown/DropDown";

const AddClinicModal = ({ show, setShow }) => {
  const addClinicFormik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      medicalCondition: "",
      useFullInfo: "",
      organDonor: "",
      bloodType: "",
      sex: "",
      date: "",
      doctorFullName: "",
      contact: "",
    },
    validationSchema: addClinicSchema,
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });

  return (
    <ModalSkeleton header={"Add Clinic"} show={show} setShow={setShow}>
      {/* <form
        onSubmit={addClinicFormik.handleSubmit}
        className={classes.AddSponsorMain}
      > */}
      <div className={classes.addFormField}>
        <Input
          label="Full name"
          placeholder="ex. Alfredo"
          name="fullName"
          value={addClinicFormik.values.fullName}
          setter={addClinicFormik.handleChange("fullName")}
          errorText={
            addClinicFormik.touched.fullName && addClinicFormik.errors.fullName
          }
        />

        <Input
          label="Email address"
          placeholder="example@example.com"
          name="email"
          type="email"
          value={addClinicFormik.values.email}
          setter={addClinicFormik.handleChange("email")}
          errorText={
            addClinicFormik.touched.email && addClinicFormik.errors.email
          }
        />

        <TextArea
          label="Medical conditions"
          placeholder="Write medical conditions here..."
          name="medicalCondition"
          value={addClinicFormik.values.medicalCondition}
          setter={addClinicFormik.handleChange("medicalCondition")}
          errorText={
            addClinicFormik.touched.medicalCondition &&
            addClinicFormik.errors.medicalCondition
          }
        />

        <TextArea
          label="Useful information"
          placeholder="Write useful information here..."
          name="useFullInfo"
          value={addClinicFormik.values.useFullInfo}
          setter={addClinicFormik.handleChange("useFullInfo")}
          errorText={
            addClinicFormik.touched.useFullInfo &&
            addClinicFormik.errors.useFullInfo
          }
        />

        <DropDown
          placeholder="Select"
          label="Are you an organ donor?"
          value={addClinicFormik.values.organDonor}
          setValue={(val) => addClinicFormik.setFieldValue("organDonor", val)}
          errorText={
            addClinicFormik.touched.organDonor &&
            addClinicFormik.errors.organDonor
          }
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />

        <DropDown
          placeholder="Select"
          label="Blood type"
          value={addClinicFormik.values.bloodType}
          setValue={(val) => addClinicFormik.setFieldValue("bloodType", val)}
          errorText={
            addClinicFormik.touched.bloodType &&
            addClinicFormik.errors.bloodType
          }
          options={[
            { label: "A+", value: "a+" },
            { label: "B+", value: "b+" },
          ]}
        />

        <DropDown
          placeholder="Select"
          label="Sex"
          value={addClinicFormik.values.sex}
          setValue={(val) => addClinicFormik.setFieldValue("sex", val)}
          errorText={addClinicFormik.touched.sex && addClinicFormik.errors.sex}
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />

        <DateInput
          label="Date of birth"
          name="date"
          placeholder="mm/dd/yyyy"
          type="date"
          value={addClinicFormik.values.date}
          setValue={(val) => addClinicFormik.setFieldValue("date", val)}
          errorText={
            addClinicFormik.touched.date && addClinicFormik.errors.date
          }
        />

        <Input
          label="Doctor full name"
          placeholder="ex. Alfredo"
          name="doctorFullName"
          value={addClinicFormik.values.doctorFullName}
          setter={addClinicFormik.handleChange("doctorFullName")}
          errorText={
            addClinicFormik.touched.doctorFullName &&
            addClinicFormik.errors.doctorFullName
          }
        />

        <Input
          placeholder="(308) 555-0121"
          label="Doctor's Phone Number"
          name="contact"
          value={addClinicFormik.values.contact}
          setter={addClinicFormik.handleChange("contact")}
          errorText={
            addClinicFormik.touched.contact && addClinicFormik.errors.contact
          }
        />
      </div>

      <div className={classes.buttonDiv}>
        <Button
          label="Cancel"
          variant="outlined"
          onClick={() => setShow(false)}
        />
        <Button
          label="Add Clinic"
          type="submit"
          onSubmit={addClinicFormik.handleSubmit}
        />
      </div>
      {/* </form> */}
    </ModalSkeleton>
  );
};

export default AddClinicModal;
