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
}

const Button: React.FC<IButton> = ({
  text,
  onClick,
  handleOnMouseEnter,
  handleOnMouseLeave,
  mouseResult,
  background,
  extrClass
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
      className={`${background} bg-white p-2 rounded-lg shadow-lg sm:text-white text-black text-xs ${
        mouseResult === text ? "hover:bg-pink-500" : ""
      } ${extrClass ? extrClass : ''}`}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export { Button }
