import React, { ReactNode } from "react";

interface BannerProps {
  content: string | ReactNode;
}

const Banner: React.FC<BannerProps> = ({ content }) => {
  return (
    <div className="z-50 relative w-full p-3 flex items-center justify-center text-center bg-gradient-to-r from-purple-400/90 via-pink-500/80 to-red-500/80 shadow backdrop-blur-md">
      <div className="relative z-10 text-white">{content}</div>
    </div>
  );
};

export default Banner;
