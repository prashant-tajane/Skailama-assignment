import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../styles/ui.module.css";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

const Dropdown = ({ options = [], label, value, onChange, placeholder, error }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null)
  const toggleOpen = useCallback(() => setOpen((prev) => !prev));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current &&!dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

  return (
    <div className={styles.input_box}>
      <span className={styles.dropdown_label}>{label}</span>
      <div 
      ref={dropdownRef} 
      className={styles.dropdown}>
        <div onClick={toggleOpen} className={styles.selections}>
          <span>{value ? value : placeholder}</span>
          {!open ? (
            <LuChevronDown size={22} color="#666666" />
          ) : (
            <LuChevronUp size={22} color="#666666" />
          )}
        </div>
        {open && (
          <div onClick={e => e.stopPropagation()} className={`${styles.options} scrollbar`}>
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  onChange(option);
                  toggleOpen();
                }}
                className={`${styles.option} ${
                  value === option ? styles.active : ""
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <small className={styles.error}>{error}</small>}
    </div>
  );
};

export default Dropdown;
