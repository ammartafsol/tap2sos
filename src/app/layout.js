import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/globals.css";
import "./css/typography.css";
import "./css/colors.css";

import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/store/auth-provider";
import RootApis from "@/component/organisms/RootApis";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <ToastContainer />
        <AuthProvider>
          <RootApis />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
