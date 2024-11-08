import { PropsWithChildren } from "react";

interface PageWrapperProps {
  title: string;
}
const PageWrapper: React.FC<PropsWithChildren<PageWrapperProps>> = ({
  title,
  children,
}) => {
  return (
    <div className="relative flex flex-col items-center p-2 w-full container mx-auto">
      <h3 className="font-bold text-2xl w-full text-start opacity-80 pl-2">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default PageWrapper;
