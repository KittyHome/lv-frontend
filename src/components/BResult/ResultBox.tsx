import clsx from "clsx";

interface ResultBoxProps {
  color?: "gold" | "silver" | "bronze";
}
const ResultBox: React.FC<ResultBoxProps> = ({ color = "gold" }) => {
  const baseColor =
    color === "gold"
      ? "yellow-500"
      : color === "silver"
      ? "gray-500"
      : "red-500";

  const borderColor = `from-${baseColor}`;
  const bgColor = `from-${baseColor}/10`;

  return (
    <div
      className={clsx(
        "w-full min-w-[300px] h-[400px] rounded-lg bg-gradient-to-b to-transparent p-0.5",
        borderColor
      )}
    >
      <div className="w-full h-full bg-background-200 rounded-lg">
        <div
          className={clsx(
            "w-full h-full bg-gradient-to-b to-transparent",
            bgColor
          )}
        ></div>
      </div>
    </div>
  );
};

export default ResultBox;
