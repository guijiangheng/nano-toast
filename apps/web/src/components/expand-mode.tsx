import { useToaster } from "@app/page";

export const ExpandMode = () => {
  const { setExpandByDefault } = useToaster();

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
          onClick={() => setExpandByDefault((x) => !x)}
        >
          Toggle expand by default
        </button>
      </div>
    </div>
  );
};
