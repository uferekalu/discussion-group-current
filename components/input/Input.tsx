import React from "react";
import { motion } from "framer-motion";

interface ICoolInput {
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type: string;
  className: string
  placeholder: string
}

const CoolInput: React.FC<ICoolInput> = ({
  inputValue,
  onChange,
  name,
  type,
  className,
  placeholder
}) => {
  return (
    <div className="mt-2">
      <motion.input
        type={type}
        value={inputValue}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        initial={{
          scale: 0.8,
          opacity: 0,
        }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={className}
      />
    </div>
  );
};

export default CoolInput;
