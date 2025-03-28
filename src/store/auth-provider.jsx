"use client";

import { handleDecrypt } from "@/resources/utils/helper";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import store, { persistor } from "./";

export function AuthProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MeUserProvider>{children}</MeUserProvider>
      </PersistGate>
    </Provider>
  );
}

export default function MeUserProvider({ children }) {
  const accessToken = handleDecrypt(Cookies.get("_xpdx"));

  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      getUserInfo(dispatch, accessToken);
    }
  }, []);

  return children;
}

export const getUserInfo = async (
  dispatch = () => {},
  accessToken,
  callback = () => {}
) => {
  const role = Cookies.get("_xpdx_r");
// Temporarily commented
//   const [userRes, verifyRes] = await Promise.allSettled([
//     Get(userUrl, accessToken, false, dispatch),
//     Get(verifyUrl, accessToken, false, dispatch),
//   ]);

//   if (userRes?.value || verifyRes?.value) {
//     const data = userRes?.value?.data?.data;
//     const verifyData = verifyRes?.value?.data?.data;

//     const isVerified =
//       verifyData?.isRegistrationCompleted &&
//       verifyData?.isProfessionalCompleted;

//     let userInfo = {
//       isVerified,
//       ...(data || {}),
//       ...(verifyData || {}),
//     };

//     if (isVerified) {
//       Cookies.set("isVerified", isVerified);
//       Cookies.set("isSubscribed", userInfo?.isSubscribed);
//     }

//     if (userInfo?.userRoleId == "2") {
//       Cookies.set(
//         "IsQuestionnaireCompleted",
//         userInfo?.isQuestionnaireCompleted
//       );
//       Cookies.set(
//         "IsRecommendationQuestionCompleted",
//         userInfo?.isRecommendationQuestionCompleted
//       );
//     }

//     Cookies.set("_xpdx_r", userInfo?.userRoleId);
//     dispatch(updateUser(userInfo));

//     callback(userInfo);
//   }
};
