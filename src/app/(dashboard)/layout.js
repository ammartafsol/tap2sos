import LayoutWrapper from "@/component/organisms/LayoutWrapper";
import "../css/globals.css";
import "../css/typography.css";
import { AuthProvider } from "@/store/auth-provider";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <LayoutWrapper>
      <div className="layout">{children}</div>
      </LayoutWrapper>

    </AuthProvider>
  );
}
