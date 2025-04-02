"use client";

import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import classes from "./DateInput.module.css";
import { mergeClass } from "@/resources/utils/helper";

export default function DateInput({
  value,
  setValue,
  label,
  error, // Show Error Boolean
  errorText, // Error Text
  placeholder = "Select Date",
  inputClass = "",
  minDate = null,
  maxDate = null,
  formatRestricted = false,
  disabled = false,
  className,
  ...props
}) {
  return (
    <div
      className={`${[classes.Container, className ? className : ""].join(" ")}`}
    >
      <style>{`
         .${classes.input} input::placeholder {
                 opacity: 1 !important;
                 color: var(--Mine-Shaft-500) !important;
                  }
          .MuiOutlinedInput-notchedOutline {
            border: none;
          }`}</style>
      {label && (
        <label
          className={mergeClass(
            classes?.label,
            "fs-13-poppins",
            disabled && classes.disabledLabel
          )}
        >
          {label}
        </label>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          minDate={minDate && minDate}
          disabled={disabled}
          maxDate={maxDate && maxDate}
          inputProps={{
            placeholder: placeholder,
          }}
          value={value && !disabled ? dayjs(value) : null} // If no value, make it null
          className={mergeClass(classes.input, inputClass)}
          onChange={(newValue) => {
            const formattedDate = newValue?.format("MM/DD/YYYY");
            formatRestricted
              ? setValue(formattedDate)
              : setValue(newValue?.format());
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{ shrink: false }}
              onKeyDown={(e) => e.preventDefault()}
              placeholder={placeholder}
              value={value ? params.inputProps.value : ""}
            />
          )}
          {...props}
        />
      </LocalizationProvider>
      {errorText && (
        <p className={`mt-2 ${[classes.errorText].join(" ")}`}>{errorText}</p>
      )}
    </div>
  );
}
