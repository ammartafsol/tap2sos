import AuthContainer from "@/component/atoms/AuthContainer";
import PropTypes from "prop-types";

export default function AuthLayout({ children }) {
  return (
    <AuthContainer>
      {children}
    </AuthContainer>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
