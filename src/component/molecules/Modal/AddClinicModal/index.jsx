import classes from "./AddClinicModal.module.css";
import { useFormik } from "formik";
import ModalSkeleton from "@/component/atoms/ModalSkeleton/ModalSkeleton";
import { Input } from "@/component/atoms/Input";
import Button from "@/component/atoms/Button";
import { addClinicSchema } from "@/schema/addClinicSchema";
import { Post } from "@/interceptor/axios-functions";
import RenderToast from "@/component/atoms/RenderToast";

const AddClinicModal = ({ show, setShow }) => {
  const addClinicFormik = useFormik({
    initialValues: {
      clinicName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: addClinicSchema,
    onSubmit: (values) => {
      handleSubmit(values)
    },
  });

  const handleSubmit = async (values)=>{
    const response = await Post({route:'',data:values});
    if(response){
      RenderToast({type:"success",message:"Clinic added successfully"})
    }
  }

  return (
    <ModalSkeleton header={"Add Clinic"} show={show} setShow={setShow}>
      <form onSubmit={addClinicFormik.handleSubmit} className={classes.addFormField}>
        <Input
          label="Clinic Name"
          placeholder="Enter clinic name"
          name="clinicName"
          value={addClinicFormik.values.clinicName}
          setter={(e)=>addClinicFormik.setFieldValue('clinicName',e)}
          errorText={addClinicFormik.touched.clinicName && addClinicFormik.errors.clinicName}
        />

        <Input
          label="Email Address"
          placeholder="example@example.com"
          name="email"
          type="email"
          value={addClinicFormik.values.email}
          setter={(e)=>addClinicFormik.setFieldValue('email',e)}
          errorText={addClinicFormik.touched.email && addClinicFormik.errors.email}
        />

        <Input
          label="Phone Number"
          placeholder="Enter phone number"
          name="phoneNumber"
          value={addClinicFormik.values.phoneNumber}
          type={"number"}
          setter={(e)=>addClinicFormik.setFieldValue('phoneNumber',e)}
          errorText={addClinicFormik.touched.phoneNumber && addClinicFormik.errors.phoneNumber}
        />

        <Input
          label="Password"
          placeholder="Enter password"
          name="password"
          type="password"
          value={addClinicFormik.values.password}
          setter={(e)=>addClinicFormik.setFieldValue('password',e)}
          errorText={addClinicFormik.touched.password && addClinicFormik.errors.password}
        />

        <Input
          label="Confirm Password"
          placeholder="Re-enter password"
          name="confirmPassword"
          type="password"
          value={addClinicFormik.values.confirmPassword}
          setter={(e)=>addClinicFormik.setFieldValue('confirmPassword',e)}
          errorText={addClinicFormik.touched.confirmPassword && addClinicFormik.errors.confirmPassword}
        />

        <div className={classes.buttonDiv}>
          <Button label="Cancel" variant="outlined" onClick={() => setShow(false)} />
          <Button label="Add Clinic" type="submit" />
        </div>
      </form>
    </ModalSkeleton>
  );
};

export default AddClinicModal;
