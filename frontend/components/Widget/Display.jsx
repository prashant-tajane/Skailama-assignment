import React, { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "../../styles/widget.module.css";
import Input from "../Input";
import Dropdown from "../Dropdown";
import { chatIconSizes, positionsOnScreen } from "../../constants";
import { MdOutlineFileUpload } from "react-icons/md";
import { uploadImage } from "../../utils/aws";
import Image from "next/image";
import Button from "../Button";
import { useSnackbar } from "notistack";
import { axiosInstance } from "../../utils/axiosInstance";

const schema = z.object({
  primaryColor: z
    .string()
    .min(1, { message: "Primary color should not be empty" })
    .trim(),
  fontColor: z
    .string()
    .min(1, { message: "Font color should not be empty" })
    .trim(),
  fontSize: z
    .string()
    .min(1, { message: "Font size should not be empty" })
    .trim(),
  chatHeight: z
    .string()
    .min(1, { message: "Font size should not be empty" })
    .trim(),
  showSources: z.boolean({
    required_error: "Show sources is required",
    invalid_type_error: "Show sources is required",
  }),
  distanceFromBottom: z.string().optional(),
  horizontalDistance: z.string().optional(),
});

const Display = ({ formData, setFormData, setTab }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const project = JSON.parse(localStorage.getItem("project"));
  const {
    control,
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      primaryColor: formData?.primaryColor || "",
      fontColor: formData?.fontColor || "",
      fontSize: formData?.fontSize || "16",
      chatHeight: formData?.chatHeight || "30",
      showSources: formData?.showSources || true,
      distanceFromBottom: formData?.distanceFromBottom || "10",
      horizontalDistance: formData?.horizontalDistance || "10",
    },
  });
  const [chatIconSize, setChatIconSize] = useState(
    formData?.chatIconSize || "Small (48x48 px)"
  );
  const [positionOnScreen, setPositionOnScreen] = useState(
    formData?.positionOnScreen || "Bottom Right"
  );
  const [botIconImage, setBotIconImage] = useState(
    formData?.botIconImage || ""
  );
  const [fileError, setFileError] = useState("");

  const primaryColor = watch("primaryColor");
  const fontColor = watch("fontColor");

  const handleUploadImage = async (event) => {
    setFileError("");
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFileError("Please upload an image file");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const { width, height } = img;

        // Check image dimensions
        if (width !== 48 || height !== 48) {
          setFileError("Image must be 48x48px");
        } else {
          setFileError("");
          // Proceed with the upload or further processing
        }
      };

      img.onerror = () => {
        setFileError("Invalid image file");
      };
    };

    reader.onerror = () => {
      setFileError("Failed to read the file");
    };

    startTransition(async () => {
      try {
        const data = await uploadImage(file);
        setBotIconImage(data);
      } catch (error) {
        enqueueSnackbar(error?.response?.data.message, {
          variant: "error",
        });
      }
    });
  };

  const onSubmit = async (values) => {
    setFormData((prevData) => ({
      ...prevData,
      ...values,
      botIconImage,
      chatIconSize,
      positionOnScreen,
    }));

    setLoading(true);

    try {
      const updatedFormData = {
        ...formData,
        ...values,
        botIconImage,
        chatIconSize,
        positionOnScreen,
        projectId: project?.id,
      };

      console.log(updatedFormData);

      await axiosInstance.post("/widgets", updatedFormData);
      setFormData({});
      setTab("General");
      enqueueSnackbar("Widget configuration saved", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error?.response?.data.message, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.grid}>
        <div className={styles.color}>
          <Controller
            control={control}
            name="primaryColor"
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <Input
                id="primaryColor"
                label="Primary Color"
                value={value}
                onChange={onChange}
                error={errors.primaryColor?.message}
              />
            )}
          />
          {primaryColor && (
            <div
              style={{
                backgroundColor: primaryColor,
                height: "44px",
                width: "44px",
                borderRadius: "4px",
                marginTop: "auto",
              }}
            ></div>
          )}
        </div>

        <div className={styles.color}>
          <Controller
            control={control}
            name="fontColor"
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <Input
                id="fontColor"
                label="Font Color"
                value={value}
                onChange={onChange}
                error={errors.fontColor?.message}
              />
            )}
          />
          {fontColor && (
            <div
              style={{
                backgroundColor: fontColor,
                height: "44px",
                width: "44px",
                borderRadius: "4px",
                marginTop: "auto",
              }}
            ></div>
          )}
        </div>

        <Controller
          control={control}
          name="fontSize"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <Input
              id="fontSize"
              label="Font Size (in px)"
              value={value}
              onChange={onChange}
              error={errors.fontSize?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="chatHeight"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <Input
              id="chatHeight"
              label="Chat Height (in % of total screen)"
              value={value}
              onChange={onChange}
              error={errors.chatHeight?.message}
            />
          )}
        />
      </div>

      <div className={styles.showSources}>
        <div className={styles.left}>
          <h3>Show Sources</h3>
          {errors.showSources?.message && (
            <small className={styles.error}>
              {errors.showSources?.message}
            </small>
          )}
        </div>

        <label htmlFor="showSources" className={styles.switch}>
          <input
            id="showSources"
            type="checkbox"
            {...register("showSources")}
            hidden
          />
          <div className={`${styles.slider} ${styles.round}`}></div>
        </label>
      </div>

      <hr className="seprator" style={{ marginTop: 10, marginBottom: 10 }} />

      <div className={styles.chatIcon}>
        <h5>Chat Icon</h5>
        <div className={styles.grid}>
          <Dropdown
            label="Chat Icon Size"
            options={chatIconSizes}
            value={chatIconSize}
            onChange={setChatIconSize}
          />
          <Dropdown
            label="Position On Screen"
            options={positionsOnScreen}
            value={positionOnScreen}
            onChange={setPositionOnScreen}
          />
          <Controller
            control={control}
            name="distanceFromBottom"
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <Input
                id="distanceFromBottom"
                label="Distance from Bottom (in px)"
                value={value}
                onChange={onChange}
                error={errors.distanceFromBottom?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="horizontalDistance"
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <Input
                id="horizontalDistance"
                label="Horizontal Distance (in px)"
                value={value}
                onChange={onChange}
                error={errors.horizontalDistance?.message}
              />
            )}
          />

          <div>
            <span className={styles.label}>Bot Icon</span>
            <div className={styles.botIcon_box}>
              {botIconImage ? (
                <Image
                  src={botIconImage}
                  alt={"botIconImage"}
                  width={60}
                  height={60}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                <div className={styles.botIcon}></div>
              )}

              <div className={styles.upload_btn}>
                <label htmlFor="botIconImage">
                  <input
                    onChange={handleUploadImage}
                    type="file"
                    id="botIconImage"
                    hidden
                  />

                  {isPending ? (
                    "Loading..."
                  ) : (
                    <>
                      <span>Upload Image</span>
                      <MdOutlineFileUpload size={20} />
                    </>
                  )}
                </label>
                {fileError && (
                  <small className={styles.error}>{fileError}</small>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.form_btn}>
        <Button
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
          label="Save"
        />
      </div>
    </div>
  );
};

export default Display;
