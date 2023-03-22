import { useToaster } from "../hooks";

export const ExpandMode = () => {
  const { expandByDefault, setExpandByDefault } = useToaster();

  return (
    <div>
      <h2>Toggle expand by default</h2>
      <p>
        You can change the amount of toasts visible through the{" "}
        <code>visibleToasts</code> prop.
      </p>
      <div className="buttons">
        <button
          className="button"
          data-active={expandByDefault}
          onClick={() => setExpandByDefault((x) => !x)}
        >
          Toggle expand by default
        </button>
      </div>
    </div>
  );
};
