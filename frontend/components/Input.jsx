import React from "react";
import styles from "../styles/ui.module.css";

const Input = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  editable
}) => {
  return (
    <div className={styles.input_box}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={editable ? !!editable : false}
      />
      {error && <small>{error}</small>}
    </div>
  );
};

export default Input;
