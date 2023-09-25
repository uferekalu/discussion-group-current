import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AllGroupsObject,
  DecodedJWT,
  DiscussionObject,
} from "@/utils/interface";
import Image from "next/image";
import { useRouter } from "next/router";
import { Select } from "../select/Select";
import { Reusables } from "@/utils/Reusables";

interface IGroupCard {
  allGroups: AllGroupsObject[];
  authenticatedUser: DecodedJWT | undefined;
  startIndex: number;
  endIndex: number;
  discussions: DiscussionObject[];
}

const GroupCard: React.FC<IGroupCard> = ({
  allGroups,
  authenticatedUser,
  startIndex,
  endIndex,
  discussions,
}) => {
  const [groupId, setGroupId] = useState<number | null>(null);
  const router = useRouter();

  const { buttonVariants, hoverButton, setHoverButton } = Reusables();

  const handleGroupId = (id: number) => {
    setGroupId((prevState) => {
      const data = prevState === id ? null : id;
      return data;
    });
  };
  return (
    <div
      style={{
        backgroundImage: 'url("/background2.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        backdropFilter: "saturate(180% blur(20px)",
      }}
      className="p-3 rounded-lg shadow-lg"
    >
      {allGroups.slice(startIndex, endIndex).map((group) => {
        const sanitizedImage =
          group.profile_picture &&
          group.profile_picture !== null &&
          group.profile_picture.replace(/\\/g, "/");
        const baseUrl = "http://localhost:5000";
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
                  src={
                    groupId === group.id ? "/images/down.png" : "/images/up.png"
                  }
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
                  src={
                    group.profile_picture === null
                      ? "/images/profile_avatar.jpg"
                      : `${baseUrl}/${sanitizedImage}`
                  }
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
                <div className="flex flex-col space-y-2">
                  {isMember ? (
                    <>
                      <Select text="Group Members">
                        {group.allUsers.map((mem: string, idx: number) => (
                          <option key={idx} value={mem}>
                            {mem}
                          </option>
                        ))}
                      </Select>
                      {discussions && discussions.length > 0 && (
                        <Select text="Discussions">
                          {discussions.map(
                            (discussion: DiscussionObject, idx: number) => (
                              <option key={idx} value={discussion.title}>
                                {discussion.title}
                              </option>
                            )
                          )}
                        </Select>
                      )}
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        onClick={() => {}}
                        onMouseEnter={() => setHoverButton("Start Discussion")}
                        onMouseLeave={() => setHoverButton(null)}
                        className={`sm:bg-blue-500 bg-white p-2 rounded-lg shadow-lg sm:text-white text-black text-xs ${
                          hoverButton === "Start Discussion"
                            ? "hover:bg-pink-500"
                            : ""
                        }`}
                      >
                        {"Start Discussion"}
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      // onClick={() => {
                      //   openModal();
                      //   selectGroup(id, groupName);
                      // }}
                      onMouseEnter={() => setHoverButton("Join Group")}
                      onMouseLeave={() => setHoverButton(null)}
                      className={`sm:bg-blue-500 bg-white p-2 rounded-lg shadow-lg sm:text-white text-black text-xs ${
                        hoverButton === "Join Group" ? "hover:bg-pink-500" : ""
                      }`}
                    >
                      {"Join Group"}
                    </motion.button>
                    // <Button
                    //   id="joinGroup"
                    //   text="Join Group"
                    // onClick={() => {
                    //   openModal();
                    //   selectGroup(id, groupName);
                    // }}
                    //   style="bg-gray-950 border mt-2 rounded-lg p-1 text-white text-sm font-medium"
                    // />
                  )}
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
