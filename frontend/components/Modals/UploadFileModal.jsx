"use client"

import { useUploadFileModal } from "../../store";
import styles from "../../styles/modals.module.css";
import Image from "next/image";
import React, { useEffect, useTransition } from "react";
import { IoMdClose } from "react-icons/io";
import Input from "../Input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TextArea from "../TextArea";
import Button from "../Button";
import { GoFileMedia } from "react-icons/go";
import { useSnackbar } from "notistack";
import { axiosInstance } from "../../utils/axiosInstance";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }).trim(),
  description: z.string().min(1, { message: "Description is required" }).trim(),
});

const UploadFileModal = ({ setUploads }) => {
  const project = JSON.parse(localStorage.getItem("project"));
  const { enqueueSnackbar } = useSnackbar();
  const [isPending, startTransition] = useTransition();
  const { onClose, data, isOpen } = useUploadFileModal();
  const { control, handleSubmit, setValue } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!isOpen) {
      setValue("name", "");
      setValue("description", "");
    }
  }, [isOpen, setValue]);

  const onSubmit = (values) => {
    startTransition(async () => {
      try {
        const response = await axiosInstance.post(
          "/projects/uploadProjectFile",
          { ...values,  projectId: project?.id, uploadFileName: data?.title }
        );
        setUploads((prevUploads) => [response.data, ...prevUploads]);
        onClose();
        enqueueSnackbar("File Uploaded Successfully", {
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
    <div className={styles.modal}>
      <div className={styles.card}>
        <div className={styles.topbar}>
          <div className={styles.topbar_data}>
            {data?.title === "File" ? (
              <GoFileMedia size={24} />
            ) : (
              <Image
                src={data?.image}
                alt={data?.title}
                width={40}
                height={40}
              />
            )}
            <p>{data?.name}</p>
          </div>
          <button type="button" onClick={onClose}>
            <IoMdClose size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.uploadFileForm}
        >
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <Input
                id="name"
                label="Name"
                value={value}
                onChange={onChange}
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <TextArea
                id="description"
                label="Description"
                value={value}
                onChange={onChange}
                error={errors.description?.message}
                rows={8}
              />
            )}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button disabled={isPending} type="submit" label="Upload" isSmall />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadFileModal;
