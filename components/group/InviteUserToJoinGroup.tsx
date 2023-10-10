import React, { useState, useEffect } from "react";
import { AllGroupsObject, UserObject } from "@/utils/interface";
import { motion } from "framer-motion";
import { Reusables } from "@/utils/Reusables";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store";
import { sendAnInvite } from "@/slices/sendInviteSlice";

interface IInvite {
  groupsUserCreated: string[] | unknown;
  users: UserObject[];
  groups: AllGroupsObject[];
}

const InviteUserToJoinGroup: React.FC<IInvite> = ({
  groupsUserCreated,
  users,
  groups,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [usersToSendInvite, setUsersToSendInvite] = useState<UserObject[]>([]);
  const [selectedGrouId, setSeletedGroupId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const inviteMessage = useAppSelector((state: RootState) => state.invite);
  const [completed, setCompleted] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { buttonVariants, setHoverButton, hoverButton } = Reusables();

  const handleSelectedGroupChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedGroup(event.target.value);
  };

  useEffect(() => {
    if (inviteMessage.inviteStatus === "success") {
      setCompleted(true);
      console.log("invite message", inviteMessage.message)
    }
  }, [inviteMessage.inviteStatus, inviteMessage.message]);

  const handleSelectedUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedUser(event.target.value);
  };

  const handleBackToGroupOption = () => {
    setSelectedGroup("");
    setSelectedUser("");
  };

  const handleSendInvite = async () => {
    const data = {
      id: selectedGrouId,
      data: {
        username: selectedUser,
      },
    };
    await dispatch(sendAnInvite(data));
  };

  useEffect(() => {
    const usersWhoDontBelongToSelectedGroup = () => {
      if (selectedGroup) {
        const group = groups.filter((group) => group.name === selectedGroup)[0];
        const usersNotInGroup = users.filter(
          (user) => !group.allUsers.includes(user.username)
        );
        setUsersToSendInvite(usersNotInGroup);
        setSeletedGroupId(group.id);
      }
    };
    usersWhoDontBelongToSelectedGroup();
  }, [groups, selectedGroup, users]);
  return (
    <div className="flex flex-col p-1 rounded-lg space-y-4">
      {inviteMessage.inviteStatus === "rejected" && (
        <span className="text-xs text-red italic">
          {inviteMessage.inviteError}
        </span>
      )}
      {completed ? (
        <div className="text-xs text-black p-2 rounded-lg">
          {inviteMessage.message}
        </div>
      ) : (
        <>
          {selectedGroup && (
            <div className="flex flex-col rounded-lg">
              <h3
                className="text-xs text-green-500 font-bold cursor-pointer"
                onClick={handleBackToGroupOption}
              >
                Back to Group option
              </h3>
              <div className="flex space-x-3 mt-2">
                <span className="text-xs text-blue-950 font-bold">
                  Chosen Group:
                </span>
                <span className="text-black text-xs">{selectedGroup}</span>
              </div>
              {selectedUser && (
                <div className="flex space-x-3 mt-2">
                  <span className="text-xs text-blue-950 font-bold">
                    Selected User:
                  </span>
                  <span className="text-black text-xs">{selectedUser}</span>
                </div>
              )}
            </div>
          )}
          <div
            className={`flex flex-col ${
              !selectedUser && "border rounded-lg"
            } p-2 space-y-2`}
          >
            {!selectedUser && (
              <>
                <h3 className="text-black text-xs font-bold justify-center items-center">
                  {selectedGroup
                    ? "Select user to invite"
                    : "Groups You Created"}
                </h3>
                {!selectedGroup && Array.isArray(groupsUserCreated) && (
                  <select
                    className="text-xs p-2 rounded-lg"
                    onChange={handleSelectedGroupChange}
                  >
                    <option>Select Group</option>
                    {groupsUserCreated.map((group: any) => (
                      <option key={group.id} value={group.name}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                )}
                {selectedGroup && (
                  <select
                    className="text-xs p-2 rounded-lg"
                    onChange={handleSelectedUserChange}
                  >
                    <option>Select User</option>
                    {usersToSendInvite.map((user: any) => (
                      <option key={user.username} value={user.username}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                )}
              </>
            )}
            {selectedUser && (
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                onMouseEnter={() => setHoverButton("Send Invite")}
                onMouseLeave={() => setHoverButton(null)}
                onClick={handleSendInvite}
                className={`bg-blue-500 p-2 rounded-lg shadow-lg text-white text-xs ${
                  hoverButton === "Send Invite" ? "hover:bg-pink-500" : ""
                }${inviteMessage.inviteStatus === "pending" && "italic"}`}
                disabled={inviteMessage.inviteStatus === "pending"}
              >
                {inviteMessage.inviteStatus === "pending"
                  ? "submitting"
                  : `Send Invite to ${selectedUser}`}
              </motion.button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InviteUserToJoinGroup;
