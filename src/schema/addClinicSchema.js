import * as Yup from "yup";

export const addClinicSchema = Yup.object().shape({
  clinicName: Yup.string().required("Clinic name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  phoneNumber: Yup.string()
    .matches(
      /^\+?[0-9]{7,15}$/,
      "Invalid phone number format"
    )
    .required("Phone number is required"),
});
