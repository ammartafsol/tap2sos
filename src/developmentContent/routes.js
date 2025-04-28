export const WITHOUT_LOGIN_ROUTES = [
  // auth pages
  "/auth/sign-in",
  "/auth/forget-password",
  "/auth/otp",
  "auth/reset-password",
];

export const ADMIN_AFTER_LOGIN_ROUTES = [
  // clinic pages
  "/",
  "/clinic-management",
  "/profile-setting",
  "/clinic/patient/[slug]",
  "/updatePassword",
];
