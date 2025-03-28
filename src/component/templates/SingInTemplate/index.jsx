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
import Image from "next/image";
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
  const handleSubmit = async (params) => {
    setLoading("loading");
    const response = await Post({ route: "auth/login", data: params });
    if (response) {
      const data = response?.data?.data;
      const role = data?.user?.role?.at(0);
      const userForCookie = {
        role,
        _id: data?.user?._id,
        email: data?.user?.email,
        isVerified: data?.user?.isVerified,
      };
      Cookies.set("_xpdx_u", JSON.stringify(userForCookie), { expires: 90 });
      Cookies.set("_xpdx", handleEncrypt(data?.token), { expires: 90 });

      if (role === "freelancer") {
        redirectRoute = "/service-provider";
        const user = data?.user;
      }
      dispatch(saveLoginUserData(response?.data));
      if (!data?.user?.isVerified) {
        Cookies.set("_xpdx_ver", "_xpdx_ver");
        router.push("/auth/otp");
      } else {
        router.push(redirectRoute);
      }
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
