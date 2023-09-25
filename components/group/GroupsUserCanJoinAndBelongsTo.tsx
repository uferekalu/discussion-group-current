import { useRouter } from "next/router";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Reusables } from "@/utils/Reusables";

interface IGroupsToJoin {
  groupsToJoin: string[] | unknown;
  belongsTo: string[] | unknown;
  openModal: () => void;
  selectGroup: (id: number, name: string) => void;
  handleGroupsUserBelongsTo: () => void;
  handleJoinAGroup: () => void;
  isJoinAGroup: boolean;
  isBelongTo: boolean;
}

const GroupsUserCanJoinAndBelongsTo: React.FC<IGroupsToJoin> = ({
  groupsToJoin,
  belongsTo,
  openModal,
  selectGroup,
  handleGroupsUserBelongsTo,
  handleJoinAGroup,
  isJoinAGroup,
  isBelongTo,
}) => {
  const router = useRouter();
  const { buttonVariants, hoverButton, setHoverButton } = Reusables();

  const h2Variants = {
    hover: {
      scale: 1.1,
      color: "white",
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <div className="flex flex-col sm:p-3 mt-3">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 2.0 }}
      >
        <div className="flex space-x-4">
          <motion.h2
            variants={h2Variants}
            whileHover="hover"
            onClick={handleJoinAGroup}
            className={`text-white font-medium sm:text-sm text-xs mb-3 sm:p-2 p-1 rounded-lg shadow-lg cursor-pointer ${
              isJoinAGroup ? "bg-black" : "bg-slate-500"
            }`}
          >
            Groups You can Join
          </motion.h2>
          <motion.h2
            variants={h2Variants}
            whileHover="hover"
            onClick={handleGroupsUserBelongsTo}
            className={`text-white font-medium sm:text-sm text-xs mb-3 sm:p-2 p-1 rounded-lg shadow-lg cursor-pointer ${
              isBelongTo ? "bg-black" : "bg-slate-500"
            }`}
          >
            Groups You Belong To
          </motion.h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4 mt-3">
          {isJoinAGroup &&
            Array.isArray(groupsToJoin) &&
            groupsToJoin.map((group) => (
              <motion.button
                key={group.id}
                variants={buttonVariants}
                whileHover="hover"
                onMouseEnter={() => setHoverButton(group.id)}
                onMouseLeave={() => setHoverButton(null)}
                onClick={() => {
                  openModal();
                  selectGroup(group.id, group.name);
                }}
                className={`sm:bg-blue-500 bg-white p-2 rounded-lg shadow-lg sm:text-white text-black text-xs ${
                  hoverButton === group.id ? "hover:bg-pink-500" : ""
                }`}
              >
                {group.name}
              </motion.button>
            ))}
          {isBelongTo &&
            Array.isArray(belongsTo) &&
            belongsTo.map((group) => (
              <motion.button
                key={group.id}
                variants={buttonVariants}
                whileHover="hover"
                onMouseEnter={() => setHoverButton(group.id)}
                onMouseLeave={() => setHoverButton(null)}
                onClick={() => router.push(`/forum/group/${group.id}`)}
                className={`sm:bg-blue-500 bg-white p-2 rounded-lg shadow-lg sm:text-white text-black text-xs ${
                  hoverButton === group.id ? "hover:bg-pink-500" : ""
                }`}
              >
                {group.name}
              </motion.button>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GroupsUserCanJoinAndBelongsTo;
