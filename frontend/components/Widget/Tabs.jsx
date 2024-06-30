"use client";

import React, { useCallback, useState } from "react";
import styles from "../../styles/widget.module.css";
import { tabs } from "../../constants";
import Display from "./Display";
import General from "./General";
import Advanced from "./Advanced";

const Tabs = () => {
  const [tab, setTab] = useState("General");
  const [formData, setFormData] = useState({});

  const handleTab = useCallback((val) => setTab(val), []);

  return (
    <>
      <div className={styles.tabs}>
        {tabs.map((val, index) => (
          <button
            key={index}
            className={
              tab === val ? `${styles.tab} ${styles.active}` : styles.tab
            }
            onClick={() => handleTab(val)}
          >
            {val}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {tab === "General" && (
          <General
            setTab={setTab}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {tab === "Display" && (
          <Display
            setTab={setTab}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {tab === "Advanced" && (
          <Advanced
            setTab={setTab}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
    </>
  );
};

export default Tabs;
