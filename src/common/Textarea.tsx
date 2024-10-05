import React, { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<TextareaProps> = (props) => {
  return (
    <textarea
      {...props}
      className={`px-3 py-2 border border-background-100 bg-background-200 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm ${props.className}`}
    />
  );
};

export default Textarea;
