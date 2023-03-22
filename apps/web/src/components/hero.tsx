import { toast } from "nano-toast";

import styles from "./hero.module.css";

export const Hero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.toasts}>
        <div className={styles.toast} />
        <div className={styles.toast} />
        <div className={styles.toast} />
      </div>
      <h1 className={styles.heading}>Nano Toast</h1>
      <center style={{ margin: "18px 0", fontSize: 18 }}>
        An opinionated toast component for React
        <br />
        Simplified version of <a href="https://sonner.emilkowal.ski/">Sonner</a>
      </center>
      <div className={styles.buttons}>
        <button
          data-primary=""
          onClick={() => {
            toast("Nano Toast", {
              description: "An opinionated toast component for React.",
            });
          }}
          className={styles.button}
        >
          Render a toast
        </button>
        <a
          className={styles.button}
          href="https://github.com/guijiangheng/nano-toast"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};
