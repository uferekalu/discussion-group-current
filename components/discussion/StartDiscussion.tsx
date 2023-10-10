import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { startDiscussion } from "@/slices/createDiscussion";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Reusables } from "@/utils/Reusables";

interface IStartDiscussion {
  closeStartDiscussion: () => void;
  discussionGroupId: number | null;
}

const StartDiscussion: React.FC<IStartDiscussion> = ({
  closeStartDiscussion,
  discussionGroupId,
}) => {
  const [startDiscussionData, setStartDiscussionData] = useState<{
    title: string;
    content: string;
  }>({
    title: "",
    content: "",
  });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const startDis = useAppSelector((state: RootState) => state.discussion);
  const { buttonVariants, setHoverButton, hoverButton } = Reusables();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStartDiscussionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const data = {
      data: {
        title: startDiscussionData.title,
        content: startDiscussionData.content,
        groupId: discussionGroupId,
      },
    };
    await dispatch(startDiscussion(data));
    if (startDis.discussionStatus === "success") {
      closeStartDiscussion();
      router.push(`/forum/group/${discussionGroupId}`);
    }
  };

  return (
    <div className="flex flex-col p-1 rounded-lg space-y-4">
      <div className="flex justify-center items-center mx-auto">
        <Image src="/group.jpg" width={60} height={60} alt="group" />
      </div>
      {startDis.discussionStatus === "rejected" && (
        <div className="flex justify-center items-center m-auto text-xs text-red-700 italic">
          {startDis.discussionError}
        </div>
      )}
      <div className="flex space-x-2 w-full">
        <label className="p-2 text-black text-xs font-bold" htmlFor="title">
          Title:
        </label>
        <input
          className="rounded-lg shadow-lg p-2 w-full border text-black text-xs"
          type="text"
          value={startDiscussionData.title}
          name="title"
          onChange={handleChange}
          placeholder="Enter discussion title"
          required
        />
      </div>
      <div className="flex space-x-2 w-full">
        <label className="p-2 text-black text-xs font-bold" htmlFor="name">
          Content:
        </label>
        <textarea
          className="rounded-lg shadow-lg p-2 border w-full text-black text-xs"
          value={startDiscussionData.content}
          name="content"
          onChange={handleChange}
          rows={5}
          cols={100}
          placeholder="Enter discussion content"
          required
        ></textarea>
      </div>
      <div className="flex space-x-2">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          onMouseEnter={() => setHoverButton("Create")}
          onMouseLeave={() => setHoverButton(null)}
          onClick={handleSubmit}
          className={`bg-blue-500 p-2 rounded-lg shadow-lg text-white text-xs ${
            hoverButton === "Create" ? "hover:bg-pink-500" : ""
          }`}
        >
          Create
        </motion.button>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          onMouseEnter={() => setHoverButton("Close")}
          onMouseLeave={() => setHoverButton(null)}
          onClick={() => closeStartDiscussion()}
          className={`bg-blue-500 p-2 rounded-lg shadow-lg text-white text-xs ${
            hoverButton === "Close" ? "hover:bg-pink-500" : ""
          }`}
        >
          Close
        </motion.button>
      </div>
    </div>
  );
};

export default StartDiscussion;
