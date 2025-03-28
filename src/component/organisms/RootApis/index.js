"use client";

import { Get } from "@/interceptor/axios-functions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const RootApis = () => {
  const dispatch = useDispatch();

  // get data apis
  const getData = async () => {
    const catUrl = "category/all";

    const [catRes] = await Promise.allSettled([Get({ route: catUrl })]);
    if (catRes?.value?.data?.data) {
      dispatch(setCategories(catRes?.value?.data?.data));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return null;
};

export default RootApis;
