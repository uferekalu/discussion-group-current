import { NextPage } from "next";
import { useRouter } from "next/router";
import { AppConfig } from "@/utils/AppConfig";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Meta } from "@/components/layout/Meta";
import { DecodedJWT, RenderItemProps } from "@/utils/interface";
import { getCookie, parseTokenExpiration, setCookie } from "@/utils/utility";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  allGroups,
  getAGroup,
  getAllDiscussionsInAGroup,
  getAllNotifications,
  joinAGroup,
} from "@/slices/groupSlice";
import jwtDecode from "jwt-decode";
import { RootState } from "@/store";
import GroupCard from "@/components/group/GroupCard";
import Navigation from "@/components/navigation/Navigation";
import { Section } from "@/components/layout/Section";
import { motion } from "framer-motion";
import PulseAnimations from "@/components/animations/PulseAnimations";
import Pagination from "@/components/pagination/Pagination";
import SideComp from "@/components/sideComp/SideComp";
import HorizontalSlider from "@/components/slider/HorizontalSlider";
import GroupDetailComp from "@/components/group/GroupDetailComp";
import { Reusables } from "@/utils/Reusables";
import { Footer } from "@/components/footer";
import ReusableModal from "@/components/modal/ReusableModal";
import CreateGroup from "@/components/group/CreateGroup";
import CreateGroupNotification from "@/components/group/CreateGroupNotification";
import JoinGroupContent from "@/components/group/JoinGroupContent";
import HasJoinedNotification from "@/components/group/HasJoinedNotification";
import StartDiscussion from "@/components/discussion/StartDiscussion";

const GroupDetail: NextPage = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState<DecodedJWT | undefined>();
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBelongsTo, setIsBelongsTo] = useState<boolean>(false);
  const [isJoinAGroup, setIsJoinAGroup] = useState<boolean>(false);
  const [belongsTo, setBelongsTo] = useState<string[] | unknown>([]);
  const [groupsToJoin, setGroupsToJoin] = useState<string[] | unknown>([]);
  const [chosenGroup, setChosenGroup] = useState<{
    id: any;
    name: string;
  }>({
    id: null,
    name: "",
  });
  const [groupsUserCreated, setGroupsUsersCreated] = useState<
    string[] | unknown
  >([]);
  const [confirmJoinGroup, setConfirmJoinGroup] = useState<boolean>(false);
  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const router = useRouter();
  const { groupDetailId }: any = router.query;
  const dispatch = useAppDispatch();
  const token: string | null = useMemo(() => getCookie("token"), []);
  const tokenExpiration = useMemo(
    () => (token ? parseTokenExpiration(token) : ""),
    [token]
  );
  const groups = useAppSelector((state: RootState) => state.groups);
  const users = useAppSelector((state: RootState) => state.user);
  const {
    buttonVariants,
    setHoverButton,
    hoverButton,
    handleCreateAGroup,
    createAGroup,
    setCreateAGroup,
    handleCreateGroupNotification,
    createGroupNotification,
    setCreateGroupNotification,
    discussionModal,
    setDiscussionModal,
    discussionGroupId,
    setDiscussionGroupId
  } = Reusables();

  console.log("discussion group id", discussionGroupId)

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

  useEffect(() => {
    dispatch(allGroups());
  }, [dispatch]);

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
    if (groupDetailId) {
      dispatch(getAGroup(groupDetailId));
      dispatch(getAllDiscussionsInAGroup(groupDetailId));
    }
  }, [dispatch, groupDetailId]);

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
        authenticatedUser={authenticatedUser}
        handleIsLoggedOut={handleIsLoggedOut}
        handleRegister={function (): void {
          throw new Error("Function not implemented.");
        }}
        handleLogin={function (): void {
          throw new Error("Function not implemented.");
        }}
        groupStatus={groups.groupStatus}
        groupsToJoin={groupsToJoin}
        openModal={openModal}
        selectGroup={selectGroup}
        handleGroupsUserBelongsTo={handleGroupsUserBelongsTo}
        handleJoinAGroup={handleJoinAGroup}
        isJoinAGroup={isJoinAGroup}
        belongsTo={belongsTo}
        isBelongTo={isBelongsTo}
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
            className="flex flex-col w-3/4 py-7"
          >
            {groups && groups.singleGroupStatus === "pending" ? (
              <PulseAnimations num={12} display="grid sm:grid-cols-3 gap-4" />
            ) : (
              <>
                {groups.discussions.length === 0 ? (
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
                    style={{
                      backgroundImage: 'url("/background3.jpg")',
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backdropFilter: "saturate(180% blur(20px)",
                    }}
                    className="flex flex-col w-3/4 py-2 mt-3 space-y-3 mb-5 justify-center items-center mx-auto rounded-lg shadow-lg bg-white"
                  >
                    <div className="text-white p-3 text-xs">
                      {`There are no discussions yet under ${groups.groupDetails.name} Group. 
                    You can Start a Discussion by clicking on the start discussion`}
                    </div>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      onMouseEnter={() => setHoverButton("Start Discussion")}
                      onMouseLeave={() => setHoverButton(null)}
                      onClick={() => {
                        setDiscussionModal(true);
                        setDiscussionGroupId(groupDetailId);
                      }}
                      className={`sm:bg-blue-500 bg-white p-2 rounded-lg shadow-lg sm:text-white text-black text-xs ${
                        hoverButton === "Start Discussion"
                          ? "hover:bg-pink-500"
                          : ""
                      }`}
                    >
                      Start Discussion
                    </motion.button>
                  </motion.div>
                ) : (
                  <HorizontalSlider
                    items={groups.discussions}
                    slideWidth={200}
                    slideHeight={200}
                    backgroundImage={'url("/images/flowerybg.jpg")'}
                    backgroundSize="cover"
                    backgroundRepeat="no-repeat"
                    backgroundPosition="center"
                    slideDuration={500}
                    slideInterval={2000}
                    groupDetailId={groupDetailId}
                  />
                )}
                <GroupDetailComp group={groups.groupDetails} />
              </>
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
            {groups && groups.singleGroupStatus === "pending" ? (
              <PulseAnimations num={12} display="grid sm:grid-cols-3 gap-4" />
            ) : (
              <>
                {groups.discussions.length === 0 ? (
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
                    style={{
                      backgroundImage: 'url("/background3.jpg")',
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backdropFilter: "saturate(180% blur(20px)",
                    }}
                    className="flex flex-col w-3/4 py-2 mt-3 space-y-3 mb-5 justify-center items-center mx-auto rounded-lg shadow-lg bg-white"
                  >
                    <div className="text-white text-xs p-3 text-center">
                      {`There are no discussions yet under ${groups.groupDetails.name} Group. 
                    You can Start a Discussion by clicking on the start discussion`}
                    </div>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      onMouseEnter={() => setHoverButton("Start Discussion")}
                      onMouseLeave={() => setHoverButton(null)}
                      onClick={() => {
                        setDiscussionModal(true);
                        setDiscussionGroupId(groupDetailId);
                      }}
                      className={`bg-blue-500 p-2 rounded-lg shadow-lg sm:text-white text-white text-xs ${
                        hoverButton === "Start Discussion"
                          ? "hover:bg-pink-500"
                          : ""
                      }`}
                    >
                      Start Discussion
                    </motion.button>
                  </motion.div>
                ) : (
                  <HorizontalSlider
                    items={groups.discussions}
                    slideWidth={200}
                    slideHeight={200}
                    backgroundImage={'url("/images/flowerybg.jpg")'}
                    backgroundSize="cover"
                    backgroundRepeat="no-repeat"
                    backgroundPosition="center"
                    slideDuration={500}
                    slideInterval={2000}
                    groupDetailId={groupDetailId}
                  />
                )}
                <GroupDetailComp group={groups.groupDetails} />
              </>
            )}
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

export default GroupDetail;
