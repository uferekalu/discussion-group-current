import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Reusables } from "@/utils/Reusables";

interface IModal {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  deSelectGroup: () => void;
  background?: string;
}

const ReusableModal: React.FC<IModal> = ({
  open,
  onClose,
  children,
  deSelectGroup,
  background,
}) => {
  if (!open) return null;

  const { buttonVariants } = Reusables();

  return (
    <div>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
      {/* Modal */}
      <div className="fixed p-4 inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div
          className={`relative sm:max-w-sm mx-auto my-6 ${
            background ? background : undefined
          }`}
        >
          <div
            className={`modal-content bg-white rounded-lg shadow-lg p-3 mt-3 ${
              background ? background : undefined
            }`}
          >
            <div className="px-4 py-3">{children}</div>
          </div>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            onClick={() => {
              onClose();
              deSelectGroup();
            }}
            className="modal-close absolute top-0 right-1 mt-1 font-semibold text-lg text-black"
          >
            {"x"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;
