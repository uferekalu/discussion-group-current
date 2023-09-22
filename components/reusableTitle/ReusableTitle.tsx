import React, { ReactNode } from "react";
import { motion } from "framer-motion";

const ReusableTitle = (level: number, text: string) => {
  const Component = `h${level}`;

  const textStyle = {
    fontWeight: "bold",
    color: "blue",
  };
  const fontSize = {
    1: "text-3xl",
    2: "text-2xl",
    3: "text-xl",
    4: "text-sm",
  };

  const MotionComponent = motion(Component);
  return (
    <div className="text-center">
      <motion.h1
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
        style={textStyle}
      >
        {text}
      </motion.h1>
    </div>
  );
};

export default ReusableTitle;
