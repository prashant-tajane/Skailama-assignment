"use client";

import styles from "../styles/home.module.css";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import Button from "../components/Button";
import { IoAddCircle } from "react-icons/io5";
import CreateProjectModal from "../components/Modals/CreateProjectModal";
import { useEffect, useState } from "react";
import useProjects from "../hooks/useProjects";
import { usePathname } from "next/navigation";
import moment from "moment"

export default function Home() {
  const [createProject, setCreateProject] = useState(false);
  
  const { projects, setProjects } = useProjects();
  const pathname = usePathname();
  let user 

  if(typeof window !== 'undefined'){
    user = JSON.parse(window.localStorage.getItem("lamaUser"));
  }


  useEffect(() => {
    if (pathname === "/") {
      localStorage.removeItem("project");
    }
  }, [pathname]);

  const handleCreateProject = () => {
    setCreateProject(true);
  };

  const handleSelectProject = (project) => {
    localStorage.setItem(
      "project",
      JSON.stringify({ id: project._id, name: project.projectName })
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Link href="/" className={styles.back_home_btn}>
          <AiOutlineHome size={20} />
          <span>Back to Home</span>
        </Link>

        {user && projects && projects?.length > 0 ? (
          <>
            <div className={styles.myProjects}>
              <h2>Projects</h2>
              <Button
                isSmall
                icon={IoAddCircle}
                onClick={handleCreateProject}
                label="Create New Project"
              />
            </div>

            <div className={styles.projects}>
              {projects?.map((project) => {
                const projectName = project.projectName
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word.charAt(0))
                  .join("");

                return (
                  <Link
                    href={`/projects`}
                    key={project._id}
                    className={styles.project}
                    onClick={() => handleSelectProject(project)}
                  >
                    <div className={styles.project_image}>{projectName}</div>
                    <div className={styles.project_info}>
                      <div className={styles.body}>
                        <h3>{project.projectName}</h3>
                        <p>{project?.uploads?.length} episods</p>
                      </div>
                      <p className={styles.timer}>{moment(project?.creadtedAt).format("DD MMM, YYYY")}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        ) : (
          <div className={styles.create_project}>
            <h1>Create a New Project</h1>
            <img src="/images/create-project.png" alt="create-project" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in
            </p>
            <Button
              icon={IoAddCircle}
              onClick={handleCreateProject}
              label="Create New Project"
            />
          </div>
        )}
      </div>
      {createProject && (
        <CreateProjectModal
          createProject={createProject}
          setCreateProject={setCreateProject}
          setProjects={setProjects}
        />
      )}

     
    </>
  );
}
