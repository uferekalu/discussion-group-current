import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { GroupDetails, GroupMemberObject } from "@/utils/interface";

interface IGroupDetailProps {
  group: GroupDetails;
}

const GroupDetailComp: React.FC<IGroupDetailProps> = ({ group }) => {
  const router = useRouter();
  return (
    <div className="w-full mb-3 p-4 mt-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex max-w-xs justify-center items-center m-auto text-xs text-black font-bold p-2 bg-gray-100 rounded-lg">
        {group.name}
      </div>
      <div className="flex justify-center text-justify items-center m-auto text-xs text-black font-medium mt-2 bg-gray-100 rounded-lg p-2 max-w-sm">
        {group.description}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4 p-3 mt-3 rounded-lg bg-gray-100">
        {group.Group_members.map((mem: GroupMemberObject, idx) => {
          const sanitizedImage =
            mem.User.profile_picture &&
            mem.User.profile_picture !== null &&
            mem.User.profile_picture.replace(/\\/g, "/");
          const baseUrl = "http://localhost:5000";
          return (
            <div
              key={idx}
              className="flex flex-col p-2 space-y-3 rounded-lg shadow-lg bg-white cursor-pointer"
              onClick={() => router.push(`/user/${mem.user_id}`)}
            >
              <div className="flex justify-center items-center m-auto">
                <Image
                  className="flex rounded-lg"
                  src={
                    mem.User.profile_picture === null
                      ? "/images/profile_avatar.jpg"
                      : `${baseUrl}/${sanitizedImage}`
                  }
                  alt="pic"
                  width={60}
                  height={60}
                />
              </div>
              <div className="flex justify-between mt-1 w-full">
                <span className="text-black text-sm font-bold">Name:</span>
                <div className="flex max-w-xs text-xs text-black -mt-2 font-medium p-2 bg-gray-100 rounded-lg">
                  {mem.User.name}
                </div>
              </div>
              <div className="flex justify-between mt-2 w-full">
                <span className="text-black text-sm font-bold">Username:</span>
                <div className="flex max-w-xs text-xs text-black -mt-2 font-medium p-2 bg-gray-100 rounded-lg">
                  {mem.User.username}
                </div>
              </div>
              <div className="flex justify-between mt-2 w-full">
                <span className="text-black text-sm font-bold">Email:</span>
                <div className="flex max-w-xs text-xs text-black -mt-2 font-medium p-2 bg-gray-100 rounded-lg">
                  {mem.User.email}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupDetailComp;
