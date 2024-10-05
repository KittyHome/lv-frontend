import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  className?: string;
  children: ReactNode;
  badge?: string | number;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, onClick, badge }, ref) => {
    const defaultClasses = "p-3 py-2 rounded min-h-[40px] relative";
    const variantClasses =
      variant === "primary"
        ? "bg-primary-gradient hover:shadow-glow-primary"
        : "bg-text-100/10 hover:bg-text-100/20";

    return (
      <motion.button
        className={clsx(defaultClasses, variantClasses, className)}
        onClick={onClick}
        ref={ref}
      >
        {children}
        <AnimatePresence>
          {badge && (
            <motion.span
              className="absolute -top-1.5 -right-1.5 bg-primary-100 rounded-full w-[fit-content] px-1 h-[15px] text-[11px] flex items-center justify-center leading-none"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              {badge}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }
);

export default Button;
