import React from "react";
import { motion } from "framer-motion";
import { Reusables } from "@/utils/Reusables";

interface ICreateGroup {
  closeHasJoined: () => void;
  text: string;
}

const CreateGroupNotification: React.FC<ICreateGroup> = ({
  closeHasJoined,
  text,
}) => {
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
            closeHasJoined();
          }}
          className={`sm:bg-blue-500 bg-white p-2 rounded-lg shadow-lg sm:text-white text-black text-xs ${
            hoverButton === "Close" ? "hover:bg-pink-500" : ""
          }`}
        >
          Close
        </motion.button>
        {/* <Button
          text="Close"
          onClick={() => {
            closeHasJoined();
          }}
          style="text-sm text-white bg-red-500 p-2 rounded-lg hover:bg-black hover:text-white"
        /> */}
      </div>
    </div>
  );
};

export default CreateGroupNotification;
