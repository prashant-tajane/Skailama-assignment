import React from "react";
import styles from "../styles/ui.module.css";

const TextArea = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  rows = 5,
}) => {
  return (
    <div className={styles.input_box}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <small>{error}</small>}
    </div>
  );
};

export default TextArea;
