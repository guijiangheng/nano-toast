import { useToaster } from "@app/page";

export const RichColors = () => {
  const { richColors, setRichColors } = useToaster();

  return (
    <div>
      <h2>Toggle rich colors</h2>
      <div className="buttons">
        <button
          className="button"
          data-active={richColors}
          onClick={() => setRichColors((x) => !x)}
        >
          Toggle rich colors
        </button>
      </div>
    </div>
  );
};
