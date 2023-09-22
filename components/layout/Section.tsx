import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface ISection {
  width: string;
  height: string;
  children: ReactNode;
  otherClassName: string;
  background: string
}

const Section: React.FC<ISection> = ({
  width,
  height,
  otherClassName,
  children,
  background
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className={`${width} ${height} ${otherClassName}`}
      style={{
        backgroundImage: background,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        backdropFilter: "saturate(180% blur(20px)",
      }}
    >
      {children}
    </motion.div>
  );
};

export { Section };
