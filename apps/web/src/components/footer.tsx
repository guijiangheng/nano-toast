import Image from "next/image";
import gjh from "public/gjh.jpeg";

import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <div className="container">
        <p className={styles.p}>
          <Image
            alt="Emil's profile picture"
            src={gjh}
            height={24}
            width={24}
          />
          <span>
            Made by{" "}
            <a
              href="https://twitter.com/guijiangheng"
              target="_blank"
              rel="noreferrer"
            >
              GJH.
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};
