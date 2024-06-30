"use client"

import DashbaordLayout from '../../components/DashbaordLayout'
import UploadFile from '../../components/Projects/UploadFile'
import Title from '../../components/Title'
import Topbar from '../../components/Topbar'
import React from 'react'

const Projects = () => {
  let project
  if(typeof window !== 'undefined'){
    project = JSON.parse(localStorage.getItem('project'));
  }
  
  return (
    <DashbaordLayout title="Podcast Upload Flow">
      <Topbar breadcrumb1={project?.name} breadcrumb2="Upload" />
      <Title text="Upload" />
      <UploadFile />
    </DashbaordLayout>
  )
}

export default Projects