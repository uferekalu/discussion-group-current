import React from "react";
import { motion } from "framer-motion";
import { Reusables } from "@/utils/Reusables";
import { DeleteNotificationSlice } from "@/utils/interface";

interface IConfirmDeleteNotification {
  handleConfirm: () => void;
  handleCancel: () => void;
  deleteState: DeleteNotificationSlice;
}

const ConfirmDeleteNotification: React.FC<IConfirmDeleteNotification> = ({
  handleCancel,
  handleConfirm,
  deleteState,
}) => {
  const { buttonVariants, setHoverButton, hoverButton } = Reusables();
  return (
    <div className="flex flex-col space-y-3 justify-center items-center">
      {deleteState.deleteNotificationStatus === "rejected" ? (
        <span className="text-xs text-center text-red italic">
          {deleteState.deleteNotificationError}
        </span>
      ) : deleteState.deleteNotificationStatus === "success" ? (
        <span className="text-sm text-ceneter text-black">
          {deleteState.message}
        </span>
      ) : (
        <>
          <i className="bi bi-exclamation-triangle-fill text-lg"></i>
          <h3 className="text-center">
            Are you sure you want to delete this notification?
          </h3>
          <div className="flex space-x-2">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              onClick={handleConfirm}
              onMouseEnter={() => setHoverButton("Confirm")}
              onMouseLeave={() => setHoverButton(null)}
              className={`bg-red-500 p-2 rounded-lg shadow-lg text-white text-xs ${
                hoverButton === "Confirm" ? "hover:bg-pink-500" : ""
              }`}
            >
              {"Confirm"}
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              onClick={handleCancel}
              onMouseEnter={() => setHoverButton("Cancel")}
              onMouseLeave={() => setHoverButton(null)}
              className={`bg-blue-500 p-2 rounded-lg shadow-lg text-white text-xs ${
                hoverButton === "Cancel" ? "hover:bg-pink-500" : ""
              }`}
            >
              {"Cancel"}
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default ConfirmDeleteNotification;
