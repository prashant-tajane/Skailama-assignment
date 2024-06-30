"use client";
import styles from "../styles/ui.module.css";
import React from "react";

const Button = ({
  icon: Icon,
  label,
  type = "button",
  disabled = false,
  onClick = () => {},
  isSmall = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={styles.button}
      style={{}}
    >
      {Icon && <Icon size={isSmall ? 26 : 30} />}
      <span style={{ fontSize: isSmall && "14px" }}>{label}</span>
    </button>
  );
};

export default Button;
