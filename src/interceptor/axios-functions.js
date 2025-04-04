"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { mediaUrl } from "./apiUrl";
import {
  baseURL,
  handleDecrypt,
  handleEncrypt,
} from "@/resources/utils/helper";
import { signOutRequest } from "@/store/auth/authSlice";
import RenderToast from "@/component/atoms/RenderToast";

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = handleDecrypt(Cookies.get("_xpdx_rf")); // Assuming the refresh token is stored in cookies
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await axios.post(mediaUrl("auth/refresh-token"), {
    token: refreshToken,
  });

  const data = response?.data;
  Cookies.set("_xpdx", handleEncrypt(data?.jwtToken));
  Cookies.set("_xpdx_rf", handleEncrypt(data?.refreshToken));

  return data?.jwtToken;
};

const getErrorMsg = (error = null) => {
  const message = error?.response?.data?.message;
  let errorMessage = "";

  if (Array.isArray(message)) {
    errorMessage = message[0];
  } else if (Array.isArray(message?.error) && message?.error[0]) {
    errorMessage = message?.error[0];
  } else {
    errorMessage = message;
  }

  return errorMessage;
};

let handleRequest = async ({
  method = "",
  route = "",
  data = {},
  headers = {},
  dispatch = null,
  showAlert = true,
  isFormData = false,
}) => {
  try {
    const url = baseURL(route);
    const token = Cookies.get("_xpdx");

    const _headers = {
      Accept: "application/json",
      "Content-Type": "application/json",

      ...(isFormData && {
        "Content-Type": "multipart/form-data",
      }),

      ...(token && {
        Authorization: `Bearer ${handleDecrypt(token)}`,
      }),

      ...headers,
    };

    const axiosResponse = await axios({
      method,
      url,
      data,
      headers: _headers,
    });

    return { data: axiosResponse, error: null }; 
  } catch (error) {
    const errorMessage = getErrorMsg(error);

    if (showAlert) {
      RenderToast({
        type: "error",
        message: errorMessage || "An unexpected error occurred.",
        position: "top-center",
      });
    }

    if (error?.response?.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken();
        headers.Authorization = `Bearer ${newAccessToken}`;
        const retryResponse = await axios({ method, url: baseURL(route), data, headers });
        return { data: retryResponse.data, error: null }; // ✅ still return .data
      } catch (refreshError) {
        dispatch?.(signOutRequest?.());
        Cookies.remove("_xpdx");
        Cookies.remove("_xpdx_rf");
      }
    }

    return {
      data: error?.response?.data || null, // ✅ match success structure
      error: error,
    };
  }
};

const Get = ({
  route = "",
  headers = {},
  dispatch = null,
  showAlert = true,
}) => {
  return handleRequest({
    method: "get",
    route,
    headers,
    dispatch,
    showAlert,
  });
};

const Post = ({
  route = "",
  data = {},
  headers = {},
  showAlert = true,
  dispatch = null,
  isFormData = false,
}) => {
  return handleRequest({
    method: "post",
    route,
    data,
    headers,
    dispatch,
    showAlert,
    isFormData,
  });
};

const Patch = ({
  route = "",
  data = {},
  headers = {},
  showAlert = true,
  dispatch = null,
  isFormData = false,
}) => {
  return handleRequest({
    method: "patch",
    route,
    data,
    headers,
    dispatch,
    isFormData,
    showAlert,
  });
};

const Put = ({
  route = "",
  data = {},
  headers = {},
  showAlert = true,
  dispatch = null,
  isFormData = false,
}) => {
  return handleRequest({
    method: "put",
    route,
    data,
    headers,
    dispatch,
    showAlert,
    isFormData,
  });
};

const Delete = ({
  route = "",
  headers = {},
  dispatch = null,
  showAlert = true,
}) => {
  return handleRequest({
    method: "delete",
    route,
    // data,
    headers,
    dispatch,
    showAlert,
  });
};

export { Delete, Get, Patch, Post, Put };
