"use client";

import BorderWrapper from "@/component/atoms/BorderWrapper";
import Button from "@/component/atoms/Button";
import RenderToast from "@/component/atoms/RenderToast";
import { Post } from "@/interceptor/axios-functions";
import { handleEncrypt } from "@/resources/utils/helper";
import { saveLoginUserData } from "@/store/auth/authSlice";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import classes from "./signIn.module.css";
import { Input } from "@/component/atoms/Input";
import { LOGIN_FORM_VALUES } from "@/developmentContent/formik/formikInitialValues/form-initial-values";
import { LoginSchema } from "@/developmentContent/formik/formikSchema/formik-schemas";

const SingInTemplate = () => {
  const [loading, setLoading] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  // LoginFormik
  const LoginFormik = useFormik({
    initialValues: LOGIN_FORM_VALUES,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // handleSubmit
  const handleSubmit = async (values) => {
    setLoading("loading");
  
    const obj = {
      email: values?.email,
      password: values?.password,
    };
  
    const response = await Post({ route: "admin/login", data: obj });  
    if (response?.data?.status === 200) {
      const data = response?.data?.data;
      console.log("data",data);
      Cookies.set("_xpdx_u", JSON.stringify(data?.user), { expires: 90 });
      Cookies.set("_xpdx", handleEncrypt(data?.token), { expires: 90 });
      dispatch(saveLoginUserData(data));
      router.push('/')
    } 
    setLoading("");

  };
  

  return (
    <div className={classes.mainParent}>
      
        <div className={classes?.mainContainer}>
          <div className={"signInText"}>
            <h4>Sign In.</h4>
            <p>Enter right credential to login </p>
          </div>
          <Row>
            <Col xs="12">
              <Input
                type={"email"}
                leftIcon={<MdEmail color="#B0B7C3" fontSize={20} />}
                placeholder={"Email"}
                value={LoginFormik.values.email}
                setter={LoginFormik.handleChange("email")}
                errorText={
                  LoginFormik.touched.email && LoginFormik.errors.email
                }
              />
            </Col>
            <Col xs="12">
              <Input
                type={"password"}
                leftIcon={<FaLock color="#B0B7C3" fontSize={16} />}
                placeholder={"Confirm Password"}
                value={LoginFormik.values.password}
                setter={LoginFormik.handleChange("password")}
                errorText={
                  LoginFormik.touched.password && LoginFormik.errors.password
                }
              />
            </Col>
            <p
              onClick={() => {
                router.push("/auth/forget-password");
              }}
              className={classes.forgetPassword}
            >
              Forgot Password?
            </p>
          </Row>
          <Button
            disabled={loading === "loading"}
            onClick={() => {
              LoginFormik.handleSubmit();
            }}
            className={classes.signIn}
            label={loading === "loading" ? "Please Wait..." : "Sign In"}
          />
        </div>
    </div>
  );
};

export default SingInTemplate;
