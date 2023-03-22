import { useToaster } from "../hooks";

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
            onClick={() => setPosition(x)}
            key={x}
          >
            {x}
          </button>
        ))}
      </div>
    </div>
  );
};
