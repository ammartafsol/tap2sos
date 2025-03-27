//delete this file

// export const API_URL = "https://gj2h0qqn-3026.inc1.devtunnels.ms";

// import config from "@/config";

// export const API_URL = config.api.baseEndpoint;

export const S3_URL = "";
// // 00
// export const baseURL = (link) => `${API_URL}/api/v1/${link}`;
export const mediaUrl = (url) => `${S3_URL}/${url}`;
// export const imageUrl = (url) => {
//   if (!url) return "";

//   if (url.startsWith("/")) return url;

//   const result = url.indexOf("http");

//   const imageRenderUrl =
//     result === -1 ? `${API_URL}/api/v1/images/${url}` : url;

//   return imageRenderUrl;
// };
