import CmsDetailViewTemplate from "@/component/templates/CmsDetailViewTemplate";
import React from "react";

export default async function CmsPage({ params }) {
  const { pageName } = await params;
  return <CmsDetailViewTemplate pageName={pageName} />;
}
