import React from "react";
import { motion } from "framer-motion";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => onChange(!checked)}
    >
      <motion.div
        className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${
          checked ? "bg-primary-200" : "bg-background-200"
        }`}
        layout
      >
        <motion.div
          className="bg-white w-4 h-4 rounded-full shadow-md"
          layout
          animate={{ x: checked ? 18 : -1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </motion.div>
    </div>
  );
};

export default Switch;
