import { toast } from "nano-toast";
import { useState } from "react";
import { CodeBlock } from "./code-block";

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
