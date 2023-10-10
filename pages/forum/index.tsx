import { NextPage } from "next";
import { AppConfig } from "@/utils/AppConfig";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Meta } from "@/components/layout/Meta";
import jwtDecode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useRouter } from "next/router";
import { Reusables } from "@/utils/Reusables";
import { getCookie, parseTokenExpiration, setCookie } from "@/utils/utility";
import {
  AllGroupsObject,
  DecodedJWT,
  RenderItemProps,
} from "@/utils/interface";
import { Section } from "@/components/layout/Section";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { allGroups, getAllNotifications, joinAGroup } from "@/slices/groupSlice";
import PulseAnimations from "@/components/animations/PulseAnimations";
import GroupCard from "@/components/group/GroupCard";
import Navigation from "@/components/navigation/Navigation";
import { RootState } from "@/store";
import GroupsUserCanJoinAndBelongsTo from "@/components/group/GroupsUserCanJoinAndBelongsTo";
import ReusableModal from "@/components/modal/ReusableModal";
import JoinGroupContent from "@/components/group/JoinGroupContent";
import HasJoinedNotification from "@/components/group/HasJoinedNotification";
import SideComp from "@/components/sideComp/SideComp";
import CreateGroup from "@/components/group/CreateGroup";
import CreateGroupNotification from "@/components/group/CreateGroupNotification";
import { getAllUsers } from "@/slices/userSlice";
import StartDiscussion from "@/components/discussion/StartDiscussion";

const Forum: NextPage = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState<DecodedJWT>();
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);
  const [belongsTo, setBelongsTo] = useState<string[] | unknown>([]);
  const [isJoinAGroup, setIsJoinAGroup] = useState<boolean>(false);
  const [isBelongsTo, setIsBelongsTo] = useState<boolean>(false);
  const [groupsToJoin, setGroupsToJoin] = useState<string[] | unknown>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const token: string | null = useMemo(() => getCookie("token"), []);
  const [chosenGroup, setChosenGroup] = useState<{
    id: any;
    name: string;
  }>({
    id: null,
    name: "",
  });
  const tokenExpiration = useMemo(
    () => (token ? parseTokenExpiration(token) : ""),
    [token]
  );
  const [confirmJoinGroup, setConfirmJoinGroup] = useState<boolean>(false);
  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [groupsUserCreated, setGroupsUsersCreated] = useState<
    string[] | unknown
  >([]);

  const groups = useAppSelector((state: RootState) => state.groups);
  const users = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    handleOpenRegisterModal,
    handleOpenLoginModal,
    createAGroup,
    setCreateAGroup,
    handleCreateGroupNotification,
    createGroupNotification,
    setCreateGroupNotification,
    handleCreateAGroup,
    discussionModal,
    setDiscussionModal,
    discussionGroupId,
    setDiscussionGroupId,
  } = Reusables();

  console.log("discussion group id", discussionGroupId);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openHasJoined = () => setHasJoined(true);
  const closeHasJoined = () => setHasJoined(false);

  const selectGroup = (id: number, name: string) => {
    setChosenGroup({
      id,
      name,
    });
  };

  const deSelectGroup = () => {
    setChosenGroup({
      id: null,
      name: "",
    });
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    const groupMembers = groups.groupDetails.Group_members;
    const index = groupMembers.findIndex(
      (member) => member.User.username === authenticatedUser?.username
    );
    if (index !== -1) {
      setIsMember(true);
    } else {
      setIsMember(false);
    }
  }, [authenticatedUser?.username, groups.groupDetails.Group_members]);

  const handleConfirmJoinGroup = () => {
    setConfirmJoinGroup(true);
  };

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  useEffect(() => {
    const handleJoinGroupAction = async () => {
      if (confirmJoinGroup) {
        await dispatch(joinAGroup(chosenGroup?.id));
        await dispatch(allGroups());
        openHasJoined();
        closeModal();
      }
    };
    handleJoinGroupAction();
  }, [dispatch, confirmJoinGroup, chosenGroup.id]);

  const handleIsLoggedOut = () => {
    setIsLoggedOut(true);
  };

  const handleGroupsUsersCreated = useCallback(() => {
    const allGroups = groups.allGroups;
    const groupsCreatedByUser = new Set();

    for (let group of allGroups) {
      let createdByUser = false;
      if (group.creatorName === authenticatedUser?.name) {
        createdByUser = true;
        groupsCreatedByUser.add({ id: group.id, name: group.name });
      }
    }
    setGroupsUsersCreated(Array.from(groupsCreatedByUser));
  }, [authenticatedUser?.name, groups.allGroups]);

  const handleGroupsUserBelongsTo = useCallback(() => {
    const allGroups = groups.allGroups;
    const groupsUserBelong = new Set();

    for (let group of allGroups) {
      const groupMembers = group.allUsers;
      let shoulBelongTo = false;

      for (let member of groupMembers) {
        if (authenticatedUser?.username === member) {
          shoulBelongTo = true;
          groupsUserBelong.add({ id: group.id, name: group.name });
        }
      }
    }
    setIsBelongsTo(true);
    setIsJoinAGroup(false);
    setBelongsTo(Array.from(groupsUserBelong));
  }, [groups.allGroups, authenticatedUser?.username]);

  const handleJoinAGroup = useCallback(() => {
    const allGroups = groups.allGroups;
    const groupsToJoin = new Set();

    for (let group of allGroups) {
      const groupMembers = group.allUsers;
      let shouldJoinGroup = true;

      for (let member of groupMembers) {
        if (authenticatedUser?.username === member) {
          shouldJoinGroup = false;
          break;
        }
      }

      if (shouldJoinGroup) {
        groupsToJoin.add({ id: group.id, name: group.name });
      }
    }
    setIsJoinAGroup(true);
    setIsBelongsTo(false);
    setGroupsToJoin(Array.from(groupsToJoin));
  }, [groups.allGroups, authenticatedUser?.username]);

  useEffect(() => {
    handleJoinAGroup();
  }, [handleJoinAGroup]);

  useEffect(() => {
    dispatch(allGroups());
  }, [dispatch]);

  useEffect(() => {
    if (tokenExpiration === null) {
      setCookie("token", "", { expires: "Thu, 01, Jan 1970 00:00:00 GMT" });
      router.push("/");
    }
    if (isLoggedOut) {
      router.push("/");
    }
    if (token) {
      const decodedUser: DecodedJWT = jwtDecode(token);
      setAuthenticatedUser(decodedUser);
    }
  }, [dispatch, router, tokenExpiration, token, isLoggedOut]);

  const renderItem = ({ startIndex, endIndex }: RenderItemProps) => {
    return (
      <GroupCard
        allGroups={groups.allGroups}
        authenticatedUser={authenticatedUser}
        startIndex={startIndex}
        endIndex={endIndex}
        discussions={groups.discussions}
        openModal={openModal}
        selectGroup={selectGroup}
        setDiscussionModal={setDiscussionModal}
        setDiscussionGroupId={setDiscussionGroupId}
      />
    );
  };

  return (
    <div className="flex flex-col text-gray-600 antialiased">
      <Meta
        title={`${AppConfig.title} | Forum`}
        description={AppConfig.description}
      />
      <Navigation
        handleRegister={handleOpenRegisterModal}
        handleLogin={handleOpenLoginModal}
        authenticatedUser={authenticatedUser}
        handleIsLoggedOut={handleIsLoggedOut}
        groupsToJoin={groupsToJoin}
        openModal={openModal}
        selectGroup={selectGroup}
        handleGroupsUserBelongsTo={handleGroupsUserBelongsTo}
        handleJoinAGroup={handleJoinAGroup}
        belongsTo={belongsTo}
        isJoinAGroup={isJoinAGroup}
        isBelongTo={isBelongsTo}
        groupStatus={groups.groupStatus}
        handleCreateAGroup={handleCreateAGroup}
        handleGroupsUsersCreated={handleGroupsUsersCreated}
        groupsUserCreated={groupsUserCreated}
        users={users.users}
        groups={groups.allGroups}
        showSendInviteGroup={true}
        notifications={groups.allNotifications}
        notificationStatus={groups.allNotificationsStatus}
        notificationError={groups.allNotificationsError}
      />
      <Section
        width="w-full"
        height="min-h-screen"
        otherClassName="flex flex-col mt-10 p-4"
        background='url("/background.jpg")'
      >
        <div className="hidden sm:flex mt-0 w-full space-x-3">
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
            className="flex flex-col w-1/4 py-6"
          >
            <SideComp groups={groups} renderItem={renderItem} />
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
            className="flex flex-col w-3/4 px-4 py-6 mt-8"
          >
            {groups.groupStatus === "pending" && (
              <PulseAnimations num={12} display="grid sm:grid-cols-3 gap-4" />
            )}
            {groups.groupStatus === "success" && (
              <GroupsUserCanJoinAndBelongsTo
                groupsToJoin={groupsToJoin}
                openModal={openModal}
                selectGroup={selectGroup}
                handleGroupsUserBelongsTo={handleGroupsUserBelongsTo}
                handleJoinAGroup={handleJoinAGroup}
                belongsTo={belongsTo}
                isJoinAGroup={isJoinAGroup}
                isBelongTo={isBelongsTo}
              />
            )}
          </motion.div>
        </div>
        <div className="flex flex-col itens-center justify-center sm:hidden space-y-2 w-full">
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
            className="flex flex-col w-full py-6"
          >
            <SideComp groups={groups} renderItem={renderItem} />
          </motion.div>
        </div>
      </Section>
      <Footer />
      <ReusableModal
        open={isModalOpen}
        onClose={closeModal}
        deSelectGroup={deSelectGroup}
      >
        <JoinGroupContent
          closeModal={closeModal}
          deSelectGroup={deSelectGroup}
          handleConfirmJoinGroup={handleConfirmJoinGroup}
          chosenGroup={chosenGroup}
        />
      </ReusableModal>
      <ReusableModal
        open={hasJoined}
        onClose={closeHasJoined}
        deSelectGroup={() => {}}
      >
        <HasJoinedNotification
          closeHasJoined={closeHasJoined}
          text={groups.joinAGroupResult}
        />
      </ReusableModal>
      <ReusableModal
        open={createAGroup}
        onClose={() => setCreateAGroup(false)}
        deSelectGroup={() => {}}
      >
        <CreateGroup
          closeCreateGroup={() => setCreateAGroup(false)}
          handleCreateGroupNotification={handleCreateGroupNotification}
        />
      </ReusableModal>
      <ReusableModal
        open={createGroupNotification}
        onClose={() => setCreateGroupNotification(false)}
        deSelectGroup={() => {}}
      >
        <CreateGroupNotification
          closeHasJoined={() => setCreateGroupNotification(false)}
          text={`Group created successfully`}
        />
      </ReusableModal>
      <ReusableModal
        open={discussionModal}
        onClose={() => setDiscussionModal(false)}
        deSelectGroup={() => {}}
      >
        <StartDiscussion
          closeStartDiscussion={() => setDiscussionModal(false)}
          discussionGroupId={discussionGroupId}
        />
      </ReusableModal>
    </div>
  );
};

export default Forum;
