// components/Modals/CreateProjectModal.jsx

"use client";

import React, { useEffect, useTransition } from "react";
import styles from "../../styles/modals.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSnackbar } from "notistack";
import { axiosInstance } from "../../utils/axiosInstance";

const schema = z.object({
  projectName: z.string().min(1, { message: "Project Name Can't be empty" }),
});

const CreateProjectModal = ({
  createProject,
  setCreateProject,
  setProjects,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!createProject) {
      setValue("projectName", "");
    }
  }, [createProject, setValue]);

  const onSubmit = async (values) => {
    startTransition(async () => {
      try {
        const { data } = await axiosInstance.post("/projects", values);

        // Update state and show success message
        setProjects((prevProjects) => [data, ...prevProjects]);
        setCreateProject(false);

        // Show success snackbar (if needed)
        // enqueueSnackbar("Project Created Successfully", {
        //   variant: "success",
        // });

        // Redirect to /projects route after successful project creation
        window.location.href = "/projects";
      } catch (error) {
        console.error("Error occurred during project creation:", error);
        // Optionally, log the error or handle it in another way
        // Do not show any snackbar or message here
      }
    });
  };

  const handleClose = () => {
    setCreateProject(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <h3 className={styles.create_project_title}>Create Project</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.create_project_form}>
          <div className={styles.form_control}>
            <label htmlFor="project_name">Enter Project Name: </label>
            <input
              type="text"
              id="project_name"
              {...register("projectName")}
              placeholder="Type here"
            />
            {errors.projectName?.message && (
              <small>{errors.projectName.message}</small>
            )}
          </div>

          <div className={styles.actions}>
            <button onClick={handleClose} type="button">
              Cancel
            </button>
            <button disabled={isPending} type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
