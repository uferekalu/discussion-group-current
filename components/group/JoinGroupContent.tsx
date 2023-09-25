import React, { useState } from "react";
import { motion } from "framer-motion";
import { Reusables } from "@/utils/Reusables";

interface IJoinGroupContent {
  closeModal: () => void;
  deSelectGroup: () => void;
  handleConfirmJoinGroup: () => void;
  chosenGroup: {
    id: number | null;
    name: string;
  };
}

const JoinGroupContent: React.FC<IJoinGroupContent> = ({
  closeModal,
  deSelectGroup,
  handleConfirmJoinGroup,
  chosenGroup,
}) => {
  const { buttonVariants, hoverButton, setHoverButton } = Reusables();
  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-3">
        <i className="bi bi-info-circle-fill text-3xl"></i>
        <p className="text-center text-sm">
          {`You have requested to join the group with name as ${chosenGroup.name} and group number as ${chosenGroup.id}`}
        </p>
        <div className="flex space-x-2">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            onClick={() => handleConfirmJoinGroup()}
            onMouseEnter={() => setHoverButton("Confirm")}
            onMouseLeave={() => setHoverButton(null)}
            className={`sm:bg-blue-500 bg-white p-2 rounded-lg shadow-lg sm:text-white text-black text-xs ${
              hoverButton === "Confirm" ? "hover:bg-pink-500" : ""
            }`}
          >
            {"Confirm"}
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            onClick={() => {
              closeModal();
              deSelectGroup();
            }}
            onMouseEnter={() => setHoverButton("Close")}
            onMouseLeave={() => setHoverButton(null)}
            className={`sm:bg-blue-500 bg-white p-2 rounded-lg shadow-lg sm:text-white text-black text-xs ${
                hoverButton === "Close" ? "hover:bg-pink-500" : ""
              }`}
          >
            {"Close"}
          </motion.button>
          {/* <Button
            text="Confirm"
            onClick={() => handleConfirmJoinGroup()}
            style="text-sm text-white bg-green-500 p-2 rounded-lg hover:bg-blue-500 hover:text-white"
          />
          <Button
            text="Close"
            onClick={() => {
              closeModal();
              deSelectGroup();
            }}
            style="text-sm text-white bg-red-500 p-2 rounded-lg hover:bg-black hover:text-white"
          /> */}
        </div>
      </div>
    </>
  );
};

export default JoinGroupContent;
