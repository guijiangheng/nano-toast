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
      <p style={{ marginTop: 0, fontSize: 18 }}>
        An opinionated toast component for React.
      </p>
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
          href="https://github.com/emilkowalski/sonner"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};
