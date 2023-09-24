import React, { useState } from "react";
import { motion } from "framer-motion";
import { AllGroupsObject, DecodedJWT } from "@/utils/interface";
import Image from "next/image";
import { useRouter } from "next/router";

interface IGroupCard {
  allGroups: AllGroupsObject[];
  authenticatedUser: DecodedJWT | undefined;
}

const GroupCard: React.FC<IGroupCard> = ({ allGroups, authenticatedUser }) => {
  const [groupId, setGroupId] = useState<number | null>(null);
  const router = useRouter();

  const handleGroupId = (id: number) => {
    setGroupId((prevState) => {
      const data = prevState === id ? null : id;
      return data;
    });
  };
  return (
    <div
      style={{
        backgroundImage: 'url("background2.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        backdropFilter: "saturate(180% blur(20px)",
      }}
      className="p-3 rounded-lg shadow-lg"
    >
      {allGroups.map((group) => {
        const isMember =
          authenticatedUser &&
          group.allUsers.includes(authenticatedUser?.username);
        return (
          <div key={group.id}>
            <motion.div
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
              className="w-full mb-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div
                onClick={() => {
                  handleGroupId(group.id);
                }}
                className="flex justify-between items-center p-2 cursor-pointer w-full"
              >
                <Image
                  className="rounded-full shadow-lg"
                  src="/discussion.jpg"
                  height="20"
                  width="20"
                  alt="up"
                />
                <span className="text-xs text-black dark:text-black">
                  {group.name}
                </span>
                <Image
                  className="rounded-full shadow-lg"
                  // src={groupId === id ? "/images/down.png" : "/images/up.png"}
                  src={"/images/up.png"}
                  height="15"
                  width="15"
                  alt="up"
                />
              </div>
            </motion.div>
            <motion.div
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
              className={`{w-full mb-3 bg-white border p-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${
                groupId === group.id ? "block" : "hidden"
              } `}
            >
              <div className="flex justify-end mt-1 mr-1">
                <Image
                  // ref={overlayRef}
                  // onClick={handleGroupOverlay}
                  className="rounded-full shadow-lg cursor-pointer"
                  src={"/images/ellipses.png"}
                  height="12"
                  width="15"
                  alt="up"
                />
              </div>
              <div className="flex flex-col items-center pb-2">
                <Image
                  className="mb-3 rounded-full shadow-lg"
                  src="/images/pic.jpg"
                  height="30"
                  width="30"
                  alt="pic"
                />
                <div
                  onClick={
                    isMember
                      ? () => router.push(`/forum/group/${group.id}`)
                      : undefined
                  }
                  className={`flex flex-col justify-center items-center ${
                    isMember && "cursor-pointer"
                  }`}
                >
                  <h5 className="mb-1 text-xs font-medium text-gray-900 dark:text-white">
                    <span className="rounded-lg font-bold text-xs">
                      Creator:
                    </span>{" "}
                    {group.username}
                  </h5>
                  <span className="text-xs text-black dark:text-black">
                    <span className="rounded-lg m-auto font-bold text-xs">
                      Group:
                    </span>{" "}
                    {group.name}
                  </span>
                  <p className="text-black text-center bg-gray-200 p-1 border rounded-lg text-xs mt-2 px-6">{`${group.description.slice(
                    0,
                    100
                  )}...`}</p>
                </div>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupCard;
