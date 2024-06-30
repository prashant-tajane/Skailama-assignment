import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../Input";
import styles from "../../styles/widget.module.css";
import Button from "../Button";

const schema = z.object({
  chatbotName: z
    .string()
    .min(1, { message: "Chatbot name should not be empty" }),
  welcomeMessage: z
    .string()
    .min(1, { message: "Welcome message should not be empty" }),
  inputPlaceholder: z
    .string()
    .min(1, { message: "Input placeholder should not be empty" }),
});

const General = ({ formData, setFormData, setTab }) => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      chatbotName: formData ? formData.chatbotName : "",
      welcomeMessage: formData ? formData.welcomeMessage : "",
      inputPlaceholder: formData ? formData.inputPlaceholder : "",
    },
  });

  const onSubmit = (values) => {
    setFormData((prevData) => ({
      ...prevData,
      ...values,
    }));
    setTab("Display");
  };

  return (
    <div className={styles.form}>
      <Controller
        control={control}
        name="chatbotName"
        render={({ field: { value, onChange }, formState: { errors } }) => (
          <Input
            id="chatbotName"
            label="Chatbot Name"
            value={value}
            onChange={onChange}
            error={errors.chatbotName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="welcomeMessage"
        render={({ field: { value, onChange }, formState: { errors } }) => (
          <Input
            id="welcomeMessage"
            label="Welcome Message"
            value={value}
            onChange={onChange}
            error={errors.welcomeMessage?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="inputPlaceholder"
        render={({ field: { value, onChange }, formState: { errors } }) => (
          <Input
            id="inputPlaceholder"
            label="Input Placeholder"
            value={value}
            onChange={onChange}
            error={errors.inputPlaceholder?.message}
          />
        )}
      />

      <div className={styles.form_btn}>
        <Button onClick={handleSubmit(onSubmit)} label="Save" />
      </div>
    </div>
  );
};

export default General;
