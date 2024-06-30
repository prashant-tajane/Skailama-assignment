"use client";

import React, { useEffect, useState, useTransition } from "react";
import styles from "../../../styles/projects.module.css";
import Button from "../../../components/Button";
import DashbaordLayout from "../../../components/DashbaordLayout";
import Topbar from "../../../components/Topbar";
import Title from "../../../components/Title";
import { LuPencil, LuSearch } from "react-icons/lu";
import { useSnackbar } from "notistack";
import { axiosInstance } from "../../../utils/axiosInstance";

const page = ({ params: { uploadId } }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isPending, startTransition] = useTransition();
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState("");
  let project;
  if (typeof window !== "undefined") {
    project = JSON.parse(localStorage.getItem("project"));
  }

  useEffect(() => {
    const fetchUploadFile = async () => {
      try {
        const response = await axiosInstance.get(
          `/projects/uploadProjectFile/${project?.id}/${uploadId}`
        );
        setDescription(response.data?.description);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUploadFile();
  }, [project?.id, uploadId]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleDiscard = () => {
    setEditMode(false);
  };

  const handleEdit = () => {
    if (!editMode) {
      return;
    }

    startTransition(async () => {
      try {
        await axiosInstance.post("/projects/uploadProjectFile/edit", {
          projectId: project?.id,
          uploadId,
          description,
        });
        enqueueSnackbar("Upload Edit Successfully", {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar(error?.response?.data.message, {
          variant: "error",
        });
      }
    });
  };

  return (
    <DashbaordLayout>
      <Topbar breadcrumb1={project?.name} breadcrumb2="Transcript" />
      <div className={styles.editTranscript}>
        <Title text="Edit Transcript" />
        {editMode && (
          <div className={styles.edit_transcript_button}>
            <button onClick={handleDiscard} className={styles.discard}>
              Discard
            </button>
            <Button
              disabled={isPending}
              onClick={handleEdit}
              label="Save & exit"
            />
          </div>
        )}
      </div>

      <div className={styles.transcript}>
        <div className={styles.upper}>
          <button onClick={toggleEditMode} className={styles.edit_btn}>
            <LuPencil />
            <span>Edit Mode</span>
          </button>
          <button className={styles.serach_icon}>
            <LuSearch size={18} />
          </button>
        </div>

        <div className={styles.bottom}>
          <span>Speaker</span>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            disabled={!editMode}
            className={`${styles.transcript_textarea} scrollbar`}
          ></textarea>
        </div>
      </div>
    </DashbaordLayout>
  );
};

export default page;
