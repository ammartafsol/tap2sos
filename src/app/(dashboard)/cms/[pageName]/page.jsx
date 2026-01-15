import CmsDetailViewTemplate from "@/component/templates/CmsDetailViewTemplate";
import React from "react";
import PropTypes from "prop-types";

function CmsPage({ params }) {
  const { pageName } = params ?? {};
  return <CmsDetailViewTemplate pageName={pageName} />;
}

CmsPage.propTypes = {
  params: PropTypes.shape({
    pageName: PropTypes.string,
  }),
};

export default CmsPage;
