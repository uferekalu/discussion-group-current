import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { allGroups, createAGroup } from "@/slices/groupSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store";
import { motion } from "framer-motion";
import { Reusables } from "@/utils/Reusables";

interface ICreateGroup {
  closeCreateGroup: () => void;
  handleCreateGroupNotification: () => void;
}

const CreateGroup: React.FC<ICreateGroup> = ({
  closeCreateGroup,
  handleCreateGroupNotification,
}) => {
  const [groupData, setGroupData] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });

  const { buttonVariants, setHoverButton, hoverButton } = Reusables();

  const dispatch = useAppDispatch();
  const createGroup = useAppSelector((state: RootState) => state.groups);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGroupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const data = {
      data: {
        name: groupData.name,
        description: groupData.description,
      },
    };
    await dispatch(createAGroup(data));
    if (createGroup.createGroupStatus === "success") {
      closeCreateGroup();
      dispatch(allGroups());
      handleCreateGroupNotification();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="flex justify-center items-center mx-auto">
        <Image src="/group.jpg" width={60} height={60} alt="group" />
      </div>
      {createGroup.createGroupStatus === "rejected" && (
        <div className="flex justify-center items-center m-auto text-xs text-red-700 italic">
          {createGroup.createGroupError}
        </div>
      )}
      <div className="flex space-x-2 w-full">
        <label className="p-2 text-black text-xs font-bold" htmlFor="name">
          Name:
        </label>
        <input
          className="rounded-lg shadow-lg p-2 w-full border text-black text-xs"
          type="text"
          value={groupData.name}
          name="name"
          onChange={handleChange}
          placeholder="Enter Group name"
          required
        />
      </div>
      <div className="flex space-x-2 w-full">
        <label className="p-2 text-black text-xs font-bold" htmlFor="name">
          Description:
        </label>
        <textarea
          className="rounded-lg shadow-lg p-2 border w-full text-black text-xs"
          value={groupData.description}
          name="description"
          onChange={handleChange}
          rows={5}
          cols={100}
          placeholder="Enter the description"
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
          onClick={() => closeCreateGroup()}
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

export default CreateGroup;
