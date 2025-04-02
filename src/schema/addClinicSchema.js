import * as Yup from "yup";

export const addClinicSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  medicalCondition: Yup.string().required("Medical condition is required"),
  useFullInfo: Yup.string().required("Useful information is required"),
  organDonor: Yup.string().required("Please select if you are an organ donor"),
  bloodType: Yup.string().required("Please select your blood type"),
  sex: Yup.string().required("Please select your sex"),
  date: Yup.date().required("Date of birth is required").nullable(),
  doctorFullName: Yup.string().required("Doctor's full name is required"),
  contact: Yup.string()
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "Invalid phone number"
    )
    .required("Doctor's phone number is required"),
});
