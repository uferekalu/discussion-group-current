import React from "react";
import { motion } from "framer-motion";

type SelectProps = {
  style?: string;
  children: React.ReactNode;
  text: string;
};

const Select: React.FC<SelectProps> = ({ style, children, text }) => {
  return (
    <motion.select
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
        delay: 0.5,
      }}
      className={`text-xs mt-2 border rounded-lg shadow-lg p-1 ${
        style ? style : undefined
      }`}
    >
      <option value="">{text}</option>
      {children}
    </motion.select>
  );
};

export { Select };
