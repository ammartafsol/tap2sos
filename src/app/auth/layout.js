import AuthContainer from "@/component/atoms/AuthContainer";

export default function AuthLayout({ children }) {
  return (
    <AuthContainer>
      {children}
    </AuthContainer>
  );
}
