import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Reusables } from "@/utils/Reusables";

interface RenderItemProps {
  startIndex: number;
  endIndex: number;
}

interface IPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  renderItem: (props: RenderItemProps) => ReactNode;
}

const Pagination: React.FC<IPagination> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  renderItem,
}) => {
  const { buttonVariants, hoverButton, setHoverButton } = Reusables();
  const getPageButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    const halfVisibleButtons = Math.floor(maxVisibleButtons / 2);

    let startPage = currentPage - halfVisibleButtons;
    let endPage = currentPage + halfVisibleButtons;

    if (startPage <= 0) {
      startPage = 1;
      endPage = Math.min(totalPages, maxVisibleButtons);
    }

    if (endPage > totalPages) {
      startPage = Math.max(totalPages - maxVisibleButtons + 1, 1);
      endPage = totalPages;
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          onMouseEnter={() => setHoverButton(page)}
          onMouseLeave={() => setHoverButton(null)}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
          className={`flex justify-center p-1 w-20 items px-2-center rounded-lg text-xs text-white ${
            page === currentPage ? "bg-red-300" : "bg-red-400"
          }`}
        >
          {page}
        </motion.button>
      );
    }

    return buttons;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div className="w-full">
      {/* Render the items using the renderItem function */}
      {renderItem({ startIndex, endIndex })}
      <div className="flex flex-col space-y-2 p-1 pb-2 border rounded-lg bg-white shadow-lg justify-center items-center">
        <p className="text-black text-xs p-1 font-medium">
          Showing {startIndex + 1} - {endIndex} of {totalItems} items
        </p>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 grid-cols-2 gap-3 p-2">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            onMouseEnter={() => setHoverButton("Previous")}
            onMouseLeave={() => setHoverButton(null)}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex justify-center p-1 w-20 items px-2-center rounded-lg text-xs text-white ${
              currentPage === 1 ? "bg-red-300" : "bg-red-400"
            }`}
          >
            Previous
          </motion.button>
          {getPageButtons()}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            onMouseEnter={() => setHoverButton("Next")}
            onMouseLeave={() => setHoverButton(null)}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex justify-center p-1 w-20 items px-2-center rounded-lg text-xs text-white ${
              currentPage === totalPages ? "bg-red-300" : "bg-red-400"
            }`}
          >
            Next
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
