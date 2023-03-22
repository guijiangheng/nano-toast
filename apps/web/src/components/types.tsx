import { toast } from "nano-toast";
import { useState } from "react";

import { CodeBlock } from "./code-block";

import styles from "./types.module.css";

const types = [
  {
    name: "Default",
    action: () => toast("Event has been created"),
    snippet: `toast('Event has been created')`,
  },
  {
    name: "Description",
    action: () =>
      toast("Event has been created", {
        description: "Monday, January 3rd at 6:00pm",
      }),
    snippet: `toast("Event has been created", {
  description: "Monday, January 3rd at 6:00pm",
})`,
  },
  {
    name: "Info",
    action: () => toast.info("Event has been created"),
    snippet: `toast.info("Event has been created")`,
  },
  {
    name: "Success",
    action: () =>
      toast.success("Event has been created", {
        description: "Monday, January 3rd at 6:00pm",
      }),
    snippet: `toast.success("Event has been created", {
  description: "Monday, January 3rd at 6:00pm",
})`,
  },
  {
    name: "Error",
    action: () =>
      toast.error("Event has been created", {
        description: "Monday, January 3rd at 6:00pm",
      }),
    snippet: `toast.error("Event has been created", {
  description: "Monday, January 3rd at 6:00pm",
})`,
  },
  {
    name: "Promise",
    action: () => {
      const promise = new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve("Create event success");
          } else {
            reject("Create event failed");
          }
        }, 4000);
      });

      const { update } = toast.promise(promise, {
        title: "Creating event...",
        description: "Monday, January 3rd at 6:00pm",
      });

      promise
        .then((x) => update({ title: x }))
        .catch((x) => update({ title: x }));
    },
    snippet: `const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve("Create event success");
    } else {
      reject("Create event failed");
    }
  }, 4000);
});

const { update } = toast.promise(promise, {
  title: "Creating event...",
  description: "Monday, January 3rd at 6:00pm",
});

promise
  .then((x) => update({ title: x }))
  .catch((x) => update({ title: x }));`,
  },
  {
    name: "Headless",
    action: () => {
      const promise = new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve("Create event success");
          } else {
            reject("Create event failed");
          }
        }, 4000);
      });

      toast.promise(promise, {
        jsx: ({ value, error, dismiss }) => (
          <div className={styles.headless}>
            <p className={styles.headlessTitle}>
              {value ? value : error ? error : "Creating Event..."}
            </p>
            <p className={styles.headlessDescription}>
              Today at 4:00pm - Louvre Museum
            </p>
            <button className={styles.headlessClose} onClick={dismiss}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L8 6.939L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L9.061 8L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L8 9.061L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L6.939 8L2.96967 4.03033C2.7034 3.76406 2.6792 3.3474 2.89705 3.05379L2.96967 2.96967Z"></path>
              </svg>
            </button>
          </div>
        ),
      });
    },
    snippet: `const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve("Create event success");
    } else {
      reject("Create event failed");
    }
  }, 4000);
});

toast.promise(promise, {
  jsx: ({ value, error, dismiss }) => (
    <div className={styles.headless}>
      <p className={styles.headlessTitle}>
        {value ? value : error ? error : "Creating Event..."}
      </p>
      <p className={styles.headlessDescription}>
        Today at 4:00pm - Louvre Museum
      </p>
      <button className={styles.headlessClose} onClick={dismiss}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L8 6.939L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L9.061 8L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L8 9.061L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L6.939 8L2.96967 4.03033C2.7034 3.76406 2.6792 3.3474 2.89705 3.05379L2.96967 2.96967Z"></path>
        </svg>
      </button>
    </div>
  ),
});`,
  },
];

export const Types = () => {
  const [activeType, setActiveType] = useState(types[0]);

  return (
    <div>
      <h2>Types</h2>
      <p>
        You can customize the type of toast you want to render, and pass an
        options object as the second argument.
      </p>
      <div className="buttons">
        {types.map((type) => (
          <button
            key={type.name}
            className="button"
            data-active={activeType === type}
            onClick={() => {
              setActiveType(type);
              type.action();
            }}
          >
            {type.name}
          </button>
        ))}
      </div>
      <CodeBlock>{activeType.snippet}</CodeBlock>
    </div>
  );
};
