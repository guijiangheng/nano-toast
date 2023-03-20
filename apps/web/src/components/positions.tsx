import { toast } from "nano-toast";

import { useToaster } from "../../app/page";

const positions = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const;

export const Positions = () => {
  const { position, setPosition } = useToaster();

  return (
    <div>
      <h2>Position</h2>
      <p>Swipe direction changes depending on the position.</p>
      <div className="buttons">
        {positions.map((x) => (
          <button
            data-active={position === x}
            className="button"
            onClick={() => {
              const toastsAmount =
                document.querySelectorAll(".nano-toast-toast").length;
              setPosition(x);
              if (toastsAmount > 0 && x !== position) return;
              toast("Event has been created", {
                description: "Monday, January 3rd at 6:00pm",
              });
            }}
            key={x}
          >
            {x}
          </button>
        ))}
      </div>
    </div>
  );
};
