"use client"

import DashbaordLayout from "../../components/DashbaordLayout";
import Title from "../../components/Title";
import Topbar from "../../components/Topbar";
import Tabs from "../../components/Widget/Tabs";
import React from "react";

const WidgetConfigurationPage = () => {
  let project
  if(typeof window !== 'undefined'){
    project = JSON.parse(localStorage.getItem('project'));
  }
  return (
    <DashbaordLayout title={project?.name}>
      <Topbar breadcrumb1={project?.name} breadcrumb2="Widget Configuration" />
      <Title text="Configuration" />
      <Tabs />
    </DashbaordLayout>
  );
};

export default WidgetConfigurationPage;
