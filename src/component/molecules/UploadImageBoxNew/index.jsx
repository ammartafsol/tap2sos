import React, { useRef } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdClose, MdModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

import classes from "./UploadImageBoxNew.module.css";
import {  mediaUrl } from "@/resources/utils/helper";
import clsx from 'clsx';
import PropTypes from "prop-types";


const UploadImageBoxNew = ({
  disabled = false,
  state,
  setter,
  label,
  subLabel,
  edit = true,
  onDelete,
  onClose,
  fallBackImage,
  isCloseable,
  hideDeleteIcon = false,
  imgClass,
  uploadImageBox,
  containerClass = "",
  onEdit = () => {},
}) => {
  const inputRef = useRef(null);

  return (
    <>
      {label && (
        <label className={`${classes.label} ${subLabel && "m-0"}`}>
          {label}
        </label>
      )}
      {subLabel && <label className={classes.subLabel}>{subLabel}</label>}

      <div className={`${classes.box} ${containerClass}`}>
        <div className={clsx(classes.uploadImageBox, uploadImageBox)}>
          {/* Close Icon */}
          {isCloseable && (
            <span className={classes.closeIcon} onClick={onClose}>
              <MdClose />
            </span>
          )}
          {state?.name || typeof state == "string" ? (
            <div className={classes.imageUploaded}>
              <img
                src={
                  typeof state == "object"
                    ? URL.createObjectURL(state)
                    : mediaUrl(state)
                }
                alt=""
                className={imgClass ? imgClass : ""}
                onError={e=> {
                  e.target.onerror=null;
                  // e.target.src = fallbackImage
                }}
              />
              <div className={classes.editAndDelete}>
                {edit && (
                  <>
                    {hideDeleteIcon && (
                      <div className={classes.icon} onClick={onDelete}>
                        <RiDeleteBinLine />
                      </div>
                    )}
                    <div
                      className={classes.icon}
                      onClick={() => {
                        inputRef.current.click();
                        onEdit();
                      }}
                    >
                      <MdModeEdit />
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div
              onClick={() => inputRef.current.click()}
              className={classes.uploadBox}
              style={disabled ? { cursor: "default" } : { cursor: "pointer" }}
            >
              {/* <CgImage className={classes.icon} /> */}
              <div
                className={
                  disabled ? classes.uploadIconDisabled : classes.uploadIcon
                }
              >
                {fallBackImage ? (
                  <div className={classes.imgDiv}>
                    <img src={fallBackImage} alt="fallBackImage" />
                  </div>
                ) : (
                  <IoIosAdd size={25} />
                )}
              </div>
            </div>
          )}
        </div>
        {/* Input For Image Upload */}
        <input
          disabled={disabled}
          hidden
          type={"file"}
          ref={inputRef}
          onChange={(e) => setter(e.target.files[0])}
        />
      </div>
    </>
  );
};

export default UploadImageBoxNew;

UploadImageBoxNew.propTypes = {
  disabled: PropTypes.bool,
  state: PropTypes.any,
  setter: PropTypes.func,
  label: PropTypes.string,
  subLabel: PropTypes.string,
  edit: PropTypes.bool,
  onDelete: PropTypes.func,
  onClose: PropTypes.func,
  fallBackImage: PropTypes.string,
  isCloseable: PropTypes.bool,
  hideDeleteIcon: PropTypes.bool,
  imgClass: PropTypes.string,
  uploadImageBox: PropTypes.string,
  containerClass: PropTypes.string,
  onEdit: PropTypes.func,
};