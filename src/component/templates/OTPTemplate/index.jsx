"use client";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import RenderToast from "@/component/atoms/RenderToast";
import { Post } from "@/interceptor/axios-functions";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./OTPTemplate.module.css";

const OTPTemplate = () => {
  const router = useRouter();
  const userEmail = useSelector((state) => state.authReducer?.user?.email);
  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const fromForgotPassword = !Cookies.get("_xpdx_ver");

  // handleInputChange
  const handleInputChange = (value, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(-1);
    setOtpValues(newOtpValues);

    if (value && index < otpValues.length - 1) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
    setErrorMessage("");
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = "";
      setOtpValues(newOtpValues);
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`)?.focus();
      }
    }
  };

  // handle submit
  const handleSubmit = async () => {
    setLoading("loading");
    if (otpValues.includes("")) {
      setLoading("");
      return setErrorMessage("Please fill in all OTP fields.");
    }
    const obj = {
      email: userEmail || Cookies.get("email"),
      code: otpValues.join(""),
      fromForgotPassword,
    };
    Cookies.set("code", obj.code);
    const response = await Post({ route: "auth/verify/otp", data: obj });
    if (response) {
      if (fromForgotPassword) {
        router.push("/auth/reset-password");
      } else {
        Cookies.remove("_xpdx_ver");
        Cookies.remove("email");
        Cookies.remove("code");
        router.push("/auth/sign-in");
      }
      RenderToast({ type: "success", message: "Success" });
      setCanResend(false);
    }
    setLoading("");
  };

  // handle resend otp
  const handleResendOTP = async () => {
    if (loading) return;
    const obj = {
      email: userEmail || Cookies.get("email"),
      fromForgotPassword,
    };
    setLoading("otp");
    const response = await Post({ route: "auth/resend/otp", data: obj });
    setLoading("");
    if (response) {
      setOtpValues(new Array(6).fill(""));
      RenderToast({ type: "info", message: "OTP resent successfully" });
      setTimer(60);
      setCanResend(false);
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <BorderWrapper containerClass={"authCard"}>
      <div className={"signInText"}>
        <h4>Email Verification</h4>
        <p>Enter the OTP sent to your email address to reset your password.</p>
      </div>
      <div className={classes.container}>
        <div className={classes.otpContainer}>
          {otpValues.map((value, idx) => (
            <Input
              key={idx}
              type="text"
              className={classes.otpInput}
              value={value}
              onChange={(e) => handleInputChange(e.target.value, idx)}
              maxLength={1}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              id={`otp-input-${idx}`}
            />
          ))}
        </div>
        <div className={classes.timerMain}>
          <p className={classes.timer}>
            {timer > 0 ? (
              `⏳ ${timer} sec`
            ) : (
              <button
                type="button"
                className={classes.resendText}
                onClick={handleResendOTP}
                disabled={!canResend || loading === "otp"}
              >
                Didn't get the code?{" "}
                <span className={classes.resendLink}>
                  {loading === "otp" ? "Sending..." : "Resend"}
                </span>
              </button>
            )}
          </p>
        </div>

        {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}

        <Button
          disabled={loading === "loading"}
          onClick={handleSubmit}
          className="btnfull"
          label={loading === "loading" ? "loading..." : "Submit"}
        />
      </div>
    </BorderWrapper>
  );
};

export default OTPTemplate;
