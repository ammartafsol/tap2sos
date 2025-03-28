"use client";

import React, { useState } from "react";
import { Input } from "@/component/atoms/Input";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import classes from "./FogetPasswordTemplate.module.css";
import { Col, Row } from "react-bootstrap";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
import Button from "@/component/atoms/Button";
import { useFormik } from "formik";
import { Post } from "@/interceptor/axios-functions";
import RenderToast from "@/component/atoms/RenderToast";
import Cookies from "js-cookie";
import { FORGET_PASSWORD_FORM_VALUES } from "@/developmentContent/formik/formikInitialValues/form-initial-values";
import { ForgetPasswordSchema } from "@/developmentContent/formik/formikSchema/formik-schemas";


const FogetPasswordTemplate = () => {
  const router = useRouter();
  const [loading,setLoading] = useState("");


  const formikForgetPassword = useFormik({
    initialValues:FORGET_PASSWORD_FORM_VALUES,
    validationSchema: ForgetPasswordSchema,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  const handleSignUp = async(values)=>{
    setLoading("loading");
    const obj = {
      email:values?.email
    }
    const response = await Post({route:"auth/forgot/password",data:obj});
    if(response){

      Cookies.set('email',obj.email);
      RenderToast({type:"success",message:"success"});
      router.push('/auth/otp');
      setLoading("");
    }
    setLoading("");
  }


  return (
    <div className={classes.mainParent}>
      <BorderWrapper containerClass={"authCard"}>
        <div>
          <div className={"signInText"}>
            <h4>Forgot Password</h4>
            <p>
              Enter the email address associated with your account, and we’ll
              email you a link to reset your password..
            </p>
          </div>
          <Row>
            <Col xs="12">
              <Input
                type={"email"}
                leftIcon={<MdEmail color="#B0B7C3" fontSize={20} />}
                placeholder={"Email"}
                setter={(e) => {
                  formikForgetPassword.setFieldValue("email", e);
                }}
                value={formikForgetPassword.values.email}
                errorText={formikForgetPassword.touched.email && formikForgetPassword.errors.email}
              />
            </Col>
          </Row>
          <Button disabled={loading === 'loading'} onClick={()=>{formikForgetPassword.handleSubmit()}} className="btnfull" label={loading === 'loading'?"loading...":"Send"} />
        </div>
      </BorderWrapper>
    </div>
  );
};

export default FogetPasswordTemplate;


