import clsx from "clsx";

const PopupPanel: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "bg-background-200/50 text-text-100 backdrop-blur rounded flex overflow-clip border border-primary-100 shadow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default PopupPanel;
