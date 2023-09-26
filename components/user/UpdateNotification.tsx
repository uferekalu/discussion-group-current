import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Reusables } from "@/utils/Reusables";

interface IUpdate {
  closeUpdate: () => void;
  text: string;
}

const UpdateNotification: React.FC<IUpdate> = ({ closeUpdate, text }) => {
  const { buttonVariants, setHoverButton, hoverButton } = Reusables();
  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <i className="bi bi-info-circle-fill text-3xl"></i>
      <p className="text-center text-sm">{text}</p>
      <div className="flex space-x-2">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          onMouseEnter={() => setHoverButton("Close")}
          onMouseLeave={() => setHoverButton(null)}
          onClick={() => {
            closeUpdate();
          }}
          className={`bg-blue-500 p-2 rounded-lg shadow-lg sm:text-white text-white text-xs ${
            hoverButton === "Close" ? "hover:bg-pink-500" : ""
          }`}
        >
          Close
        </motion.button>
        {/* <Button
          text="Close"
          onClick={() => {
            closeUpdate()
          }}
          style="text-sm text-white bg-red-500 p-2 rounded-lg hover:bg-black hover:text-white"
        /> */}
      </div>
    </div>
  );
};

export default UpdateNotification;
