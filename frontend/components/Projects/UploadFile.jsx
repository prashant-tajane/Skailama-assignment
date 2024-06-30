"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/projects.module.css";
import { uploadsFiles } from "../../constants";
import Image from "next/image";
import { useUploadFileModal } from "../../store";
import UploadFileModal from "../Modals/UploadFileModal";
import UploadFileTable from "./UploadFileTable";
import { axiosInstance } from "../../utils/axiosInstance";

const UploadFile = () => {
  const [uploads, setUploads] = useState([]);
  const uploadFileModal = useUploadFileModal();
  let project
  if(typeof window !== 'undefined'){
    project = JSON.parse(localStorage.getItem('project'));
  }

  useEffect(() => {
    const fetchedUploads = async () => {
      try {
        const { data } = await axiosInstance(
          `/projects/uploadProjectFile/${project.id}`
        );
        setUploads(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchedUploads();
  }, [project?.id]);

  const handleSelectFile = (data) => {
    uploadFileModal.setData(data);
    uploadFileModal.onOpen();
  };
  return (
    <>
      <div className={styles.uploadFile}>
        <div className={styles.uploadFiles}>
          {uploadsFiles.map((obj, idx) => (
            <div
              onClick={() => handleSelectFile(obj)}
              className={styles.uploadFileItem}
              key={idx}
            >
              <Image src={obj.image} alt={obj.title} width={46} height={46} />
              <p>{obj.name}</p>
            </div>
          ))}
        </div>

        {!uploads?.length && (
          <>
            <p style={{ textAlign: "center", opacity: 0.6, fontSize: 18 }}>
              or
            </p>

            <div className={styles.selectFile}>
              <Image
                src="/images/cloud-upload.png"
                alt="cloud-upload"
                width={60}
                height={60}
              />
              <p>
                Select a file or drag and drop here (Podcast Media or
                Transcription Text)
              </p>
              <span>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file</span>
              <button
                onClick={() =>
                  handleSelectFile({
                    title: "File",
                    name: "Upload From Computer",
                  })
                }
              >
                Select File
              </button>
            </div>
          </>
        )}
      </div>

      {uploads?.length && (
        <div className={styles.box}>
          <p>All files are processed! Your widget is ready to go!</p>
          <button>Try it out!</button>
        </div>
      )}

      {uploads && uploads.length > 0 && (
        <UploadFileTable
          setUploads={setUploads}
          uploads={uploads}
          projectId={project?.id}
        />
      )}

      {uploadFileModal.isOpen && <UploadFileModal setUploads={setUploads} />}
    </>
  );
};

export default UploadFile;
