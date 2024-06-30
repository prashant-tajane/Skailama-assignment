import styles from "../styles/logo.module.css"
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
      <img src="/images/logo.png" alt="logo" />
      <span>LAMA.</span>
    </Link>
  );
};

export default Logo;
