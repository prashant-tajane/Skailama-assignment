"use client";

import React from "react";
import Sidebar from "./Sidebar";

const DashbaordLayout = ({ children, title}) => {
  
  return (
    <div className="projects_layout">
      <Sidebar title={title} />
      <div className="projects_layout_main">{children}</div>
    </div>
  );
};

export default DashbaordLayout;
