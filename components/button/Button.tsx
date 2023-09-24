import React from "react";
import { motion } from "framer-motion";

interface IButton {
  text: string;
  onClick: () => void;
  handleOnMouseEnter: () => void;
  handleOnMouseLeave: () => void;
  mouseResult: number | string | null;
  background: string
  extrClass?: string
  type?: "button" | "submit" | "reset" | undefined
  disabled?: boolean
}

const Button: React.FC<IButton> = ({
  text,
  onClick,
  handleOnMouseEnter,
  handleOnMouseLeave,
  mouseResult,
  background,
  extrClass,
  type,
  disabled
}) => {
  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };

  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      className={`${background} p-2 rounded-lg shadow-lg text-white text-xs ${
        mouseResult === text ? "hover:bg-pink-500" : ""
      } ${extrClass ? extrClass : ''}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </motion.button>
  );
};

export { Button }
