import React from "react";
import { Flip, toast } from "react-toastify";
import PropTypes from "prop-types";


const RenderToast = ({
  type = "error",
  message = "Internal Server Error",
  ...props
}) => {
  const toastId = globalThis.window
    ? globalThis.localStorage.getItem("RT_ERROR_IDENTIFIER")
    : undefined;
  let toastDetailObject = {
    position: "top-right",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
    ...props,
  };
  const HandleSetErrorOnLocalStorage = () => {
    if (globalThis.window) {
      globalThis.localStorage.setItem("RT_ERROR_IDENTIFIER", "Error Render");
    }
    return toast[type](message, {
      ...toastDetailObject,
      toastId: "Error Render",
    });
  };
  return (
    <div>
      {toast.isActive(toastId)
        ? toast.update(toastId, {
            ...toastDetailObject,
            render: message,
            type: type,
          })
        : HandleSetErrorOnLocalStorage()}
    </div>
  );
};

export default RenderToast;

RenderToast.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};