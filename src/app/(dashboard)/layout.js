import "../css/globals.css";
import "../css/typography.css";
import { AuthProvider } from "@/store/auth-provider";
import "bootstrap/dist/css/bootstrap.min.css";
// import LayoutWrapper from "@/component/organisms/LayoutWrapper";
// import { SocketProvider } from "@/component/organisms/context";

export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
    {/* // <LayoutWrapper> */}
      {/* // <SocketProvider> */}
      <div className="layout">{children}</div>
      {/* // </SocketProvider> */}
    {/* // </LayoutWrapper> */}
    </AuthProvider>
  );
}
