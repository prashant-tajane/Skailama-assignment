"use client"

import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdArrowDropDown, MdMenu } from "react-icons/md";
import styles from "../styles/topbar.module.css";
import Image from "next/image";
import { useSidebar } from "../store";

const Topbar = ({ breadcrumb1, breadcrumb2 }) => {
  const sidebar = useSidebar()
  return (
    <div className={styles.topbar}>
      <div className={styles.breadcrumb}>
        <AiOutlineHome color="#7E22CE" size={24} />
        {breadcrumb1 && <span className={styles.separator}>/</span>}
        <span
          className={styles.breadcrumb_one}
          style={{
            color: !breadcrumb2 && "#7e22ce",
          }}
        >
          {breadcrumb1}
        </span>
        {breadcrumb2 && <span className={styles.separator}>/</span>}
        <span className={styles.breadcrumb_two}>{breadcrumb2}</span>
      </div>

      <div className={styles.topbar_right}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className={styles.country}>
            <MdArrowDropDown size={32} />
            <span>EN</span>
            <Image
              src="/images/country.png"
              alt="country"
              width={30}
              height={30}
            />
          </div>
          <IoNotificationsOutline size={28} />
        </div>
        <button  onClick={sidebar.toggleMenu} className={styles.menu}>
          <MdMenu size={32} />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
