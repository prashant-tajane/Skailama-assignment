"use client";

import DashbaordLayout from "../../components/DashbaordLayout";
import Title from "../../components/Title";
import React, { useTransition } from "react";
import styles from "../../styles/setting.module.css";
import Topbar from "../../components/Topbar";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { axiosInstance } from "../../utils/axiosInstance";
import { useSnackbar } from "notistack";

const SettingsPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isPending, startTransition] = useTransition();
  let project
  let user
  if(typeof window !== 'undefined'){
    project = JSON.parse(localStorage.getItem('project'));
    user = JSON.parse(window.localStorage.getItem("lamaUser"));
  }
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const onSubmit = (values) => {
    startTransition(async () => {
      try {
        await axiosInstance.patch(`/users/${user?._id}`, {
          name: values.name,
        });
        enqueueSnackbar("Profile Updated Successfully", {
          variant: "success",
        });
        const updatedUser = {...user, name: values.name };
        localStorage.setItem("lamaUser", JSON.stringify(updatedUser));

      } catch (error) {
        enqueueSnackbar(error?.response?.data.message, {
          variant: "error",
        });
      }
    });
  };

  return (
    <DashbaordLayout title={project?.name}>
      <Topbar breadcrumb1="Account Settings" />
      <Title text="Account Settings" />

      <div className={styles.profile}>
        <Image
          src={user?.image}
          alt={user?.name}
          width={120}
          height={120}
          style={{ borderRadius: "50%" }}
        />
        <form>
          <div className={styles.form_input}>
            <Controller
              control={control}
              name="name"
              render={({
                field: { value, onChange },
                formState: { errors },
              }) => (
                <Input
                  id="name"
                  label="User Name"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({
                field: { value, onChange },
                formState: { errors },
              }) => (
                <Input
                  id="email"
                  label="Email"
                  value={value}
                  onChange={onChange}
                  editable={true}
                />
              )}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 16,
            }}
          >
            <Button disabled={isPending} onClick={handleSubmit(onSubmit)} label="Save" />
          </div>
        </form>
      </div>

      <div className={styles.subscription}>
        <Title text="Subscriptions" />

        <div className={styles.subscription_box}>
          <p>
            You are currently on the <span>Ques AI Basic Plan!</span>
          </p>
          <button>Upgrade</button>
        </div>
        <button className={styles.cancel_btn}>Cancel Subscription</button>
      </div>
    </DashbaordLayout>
  );
};

export default SettingsPage;
