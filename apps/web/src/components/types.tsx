import { toast } from "nano-toast";
import { createContext } from "nano-toast/src/hooks";
import { useState } from "react";

const [ActiveTypeProvider, useActiveType] = createContext(
  "ActiveTypeProvider",
  function useActiveTypeImpl() {
    const [activeType, setActiveType] = useState<string>("");
    return { activeType, setActiveType };
  }
);

interface Props {
  name: string;
  onClick: () => void;
}

const Template = ({ name, onClick }: Props) => {
  const { activeType, setActiveType } = useActiveType();

  return (
    <button
      data-active={activeType === name}
      onClick={() => {
        setActiveType(name);
        onClick();
      }}
    >
      {name}
    </button>
  );
};

export const Types = () => {
  return (
    <ActiveTypeProvider>
      <div>
        <h2>Types</h2>
        <p>
          You can customize the type of toast you want to render, and pass an
          options object as the second argument.
        </p>
        <div className="buttons">
          <Template
            name="Default"
            onClick={() => toast("Event has been created")}
          />
          <Template
            name="Description"
            onClick={() =>
              toast("Event has been created", {
                description: "Monday, January 3rd at 6:00pm",
              })
            }
          />
          <Template
            name="Info"
            onClick={() => toast.info("Event has been created")}
          />
          <Template
            name="Success"
            onClick={() =>
              toast.success("Event has been created", {
                description: "Monday, January 3rd at 6:00pm",
              })
            }
          />
          <Template
            name="Error"
            onClick={() =>
              toast.error("Event has been created", {
                description: "Monday, January 3rd at 6:00pm",
              })
            }
          />
          <Template
            name="Promise"
            onClick={() => {
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
            }}
          />
        </div>
      </div>
    </ActiveTypeProvider>
  );
};
