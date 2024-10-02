import React, { ReactNode } from "react";

interface BannerProps {
  content: string | ReactNode;
}

const Banner: React.FC<BannerProps> = ({ content }) => {
  return (
    <div className="fixed left-0 top-0 w-full z-50">
      <div className="relative w-full p-3 flex items-center justify-center text-center bg-gradient-to-r from-purple-400/90 via-pink-500/80 to-red-500/80 shadow backdrop-blur-md">
        <div className="relative z-10 text-white">{content}</div>
      </div>
    </div>
  );
};

export default Banner;
