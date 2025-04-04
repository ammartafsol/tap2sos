import * as Yup from "yup";

export const addClinicSchema = Yup.object().shape({
  clinicName: Yup.string().required("Clinic name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(
      /^\+?[0-9]{7,15}$/,
      "Invalid phone number format"
    )
    .required("Phone number is required"),
});
