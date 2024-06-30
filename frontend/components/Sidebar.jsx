"use client";

import styles from "../styles/sidebar.module.css";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSettingsOutline, IoClose } from "react-icons/io5";
import { useSidebar } from "../store";
import { useMediaQuery } from "react-responsive";

const links = [
  { name: "Projects", path: "/projects" },
  { name: "Widget Configuration", path: "/widget-configuration" },
  { name: "Deployment", path: "/deployment" },
  { name: "Pricing", path: "/pricing" },
];
const Sidebar = ({ title }) => {
  const pathname = usePathname();
  const sidebar = useSidebar();
  const isMobile = useMediaQuery({ query: '(max-width: 968px)' })
  
  const handleClick = () => {
    if (isMobile) {
      setTimeout(() => {
        sidebar.onClose();
      }, 200);
    }
  };
  return (
    <div
      className={`${styles.sidebar} ${
        isMobile && sidebar.isOpen ? styles.visible : styles.invisible
      }`}
    >
      <div className={styles.top}>
        <Logo />
        {isMobile && (
          <button onClick={sidebar.onClose}>
            <IoClose size={24} />
          </button>
        )}
      </div>
      <p className={styles.title}>{title}</p>

      <div className={styles.links}>
        {links.map((link, index) => {
          return (
            <Link
              href={link.path}
              key={link.name}
              className={`${styles.link} ${
                pathname === link.path ? styles.active : ""
              }`}
              onClick={handleClick}
            >
              <span>{index + 1}</span>
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>

      <div className={styles.sidebar_bottom}>
        <Link
          href="/settings"
          className={`${styles.link} ${
            pathname === "/settings" ? styles.active : ""
          }`}
        >
          <span>
            <IoSettingsOutline />
          </span>
          <span>Settings </span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
