import styles from "../styles/navbar.module.css";
import React from "react";
import Logo from "./Logo";
import { IoSettingsOutline, IoNotificationsOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Logo />
      <div className={styles.navbar_actions}>
        <IoSettingsOutline size={26} />
        <IoNotificationsOutline size={26} />
      </div>
    </div>
  );
};

export default Navbar;
