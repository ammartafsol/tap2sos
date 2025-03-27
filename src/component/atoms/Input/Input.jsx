"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./Input.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

/**
 * Primary UI component for user interaction
 */
const Input = ({
  type,
  label,
  label2, // sub label
  value, // input value
  setValue, //setValue
  noBorder,
  placeholder,
  disabled,
  customStyle, //Input Container inline Style
  inputStyle, //Input inline Style
  labelStyle, //Label inline Style
  error, // Show Error Boolean
  errorText, // Error Text
  leftIcon, // Icon For Input
  rightIcon,
  // toottipIcon, // Tool Tip Icon
  // tooltipText, // Tool Tip Text
  // tooltipClassName, // Tool Tip class
  inputRef,
  inputBoxClass,
  onEnterClick,
  className,
  inputContainerClass = "",
  variant = "",
  ...props
}) => {
  const [passToggle, setPassToggle] = useState(false);

  return (
    <>
      <div
        className={`${[classes.Container, className && className].join(" ")}`}
        data-variant={variant}
      >
        {label && (
          <label
            htmlFor={`input${label}`}
            className={`${[
              classes.labelText,
              disabled && classes.disabled,
            ].join(" ")}`}
            style={{ ...labelStyle }}
          >
            {label} {label2 && label2}
          </label>
        )}
        <div
          className={`${[classes.inputPassContainer, inputContainerClass].join(
            " "
          )}`}
          style={{ ...customStyle }}
        >
          {leftIcon && <div className={classes.leftIconBox}>{leftIcon}</div>}
          <input
            value={value}
            color-variant={variant}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={disabled}
            placeholder={placeholder}
            type={passToggle == true ? "text" : type}
            id={`input${label}`}
            className={` ${[
              inputBoxClass,
              classes.inputBox,
              noBorder && classes.noBorder,
            ].join(" ")}`}
            style={{ ...inputStyle, ...(leftIcon && { paddingLeft: 50 }) }}
            onKeyPress={(e) =>
              ["Enter", "NumpadEnter"].includes(e.code) &&
              onEnterClick &&
              onEnterClick()
            }
            // onBlur={() => {
            //   setValue(value?.trim());
            // }}
            ref={inputRef}
            {...props}
            onKeyDown={(e) => {
              if (type == "number") {
                return (
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                );
              }
            }}
          />

        {rightIcon && <div className={classes.rightIconBox}>{rightIcon}</div>}


          {type == "password" && passToggle == false && (
            <VisibilityOffIcon
              className={classes.passwordIcon}
              onClick={() => setPassToggle(!passToggle)}
            />
          )}
          {type == "password" && passToggle && (
            <VisibilityIcon
              className={classes.passwordIcon}
              onClick={() => setPassToggle(!passToggle)}
            />
          )}
        </div>
        {errorText && (
          <p className={`mt-2 ${[classes.errorText].join(" ")}`}>{errorText}</p>
        )}
      </div>
    </>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.string,
  noBorder: PropTypes.bool,
  disabled: PropTypes.bool,
  customStyle: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  label2: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  placeholder: "enter here...",
  value: "",
  noBorder: false,
  disabled: false,
  error: false,
  errorText: "",
};

export default Input;
