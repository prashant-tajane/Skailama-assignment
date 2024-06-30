import React, { useTransition } from "react";
import styles from "../../styles/projects.module.css";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { axiosInstance } from "../../utils/axiosInstance";

const UploadFileTable = ({ uploads, setUploads, projectId }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isPending, startTransition] = useTransition();

  const handleDeleteProjectFile = (uploadId) => {
    startTransition(async () => {
      try {
        await axiosInstance.post("/projects/uploadProjectFile/delete", {
          projectId,
          uploadId,
        });
        setUploads((prevUploads) =>
          prevUploads.filter((upload) => upload._id !== uploadId)
        );
        enqueueSnackbar("Upload Deleted Successfully", {
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
    <div className={`${styles.uploadFile_table} scrollbar`}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Upload Date & Time</th>
            <th>Status</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {uploads &&
            uploads?.map((upload) => (
              <tr key={upload?._id}>
                <td>{upload.name}</td>
                <td>
                  {moment(upload?.createdAt).format("DD MMM, YY")} |{" "}
                  {moment(upload?.createdAt).format("HH:MM")}
                </td>
                <td style={{ textTransform: "capitalize" }}>
                  {upload?.status}
                </td>
                <td>
                  <div className={styles.table_action}>
                    <button
                      onClick={() => router.push(`/projects/${upload?._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      disabled={isPending}
                      onClick={() => handleDeleteProjectFile(upload?._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadFileTable;
