import { useToaster } from "@app/page";

export const RichColors = () => {
  const { setRichColors } = useToaster();

  return (
    <div>
      <h2>Toggle rich colors</h2>
      <div className="buttons">
        <button className="button" onClick={() => setRichColors((x) => !x)}>
          Toggle expand by default
        </button>
      </div>
    </div>
  );
};
