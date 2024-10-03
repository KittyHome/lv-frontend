import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  className?: string;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  onClick,
}) => {
  const defaultClasses = "p-3 py-2 rounded";
  const variantClasses =
    variant === "primary"
      ? "bg-primary-gradient hover:shadow-glow-primary"
      : "bg-background-200 hover:shadow-glow-secondary";

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      className={clsx(defaultClasses, variantClasses, className)}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Button;
