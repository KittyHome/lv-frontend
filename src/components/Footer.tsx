import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-4 relative">
      <div className="container mx-auto flex justify-center items-center">
        <div>
          <p>
            &copy; {new Date().getFullYear()} KittyHome. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
