import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Meta } from "@/components/layout/Meta";
import { AppConfig } from "@/utils/AppConfig";
import { motion } from "framer-motion";
import { Logo } from "@/components/logo/Logo";
import { getCookie, parseTokenExpiration, setCookie } from "@/utils/utility";
import { DecodedJWT } from "@/utils/interface";
import jwtDecode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import NavButton from "@/components/navigation/NavButton";
import { Reusables } from "@/utils/Reusables";
import { allGroups, getAllNotifications } from "@/slices/groupSlice";
import { RootState } from "@/store";
import { Notifications } from "@/components/notifications/Notifications";
import { Footer } from "@/components/footer";
import Image from "next/image";
import DiscussionDetailComp from "@/components/discussionDetail/DiscussionDetailComp";
import CommentsToDiscussion from "@/components/discussionDetail/CommentsToDiscussion";
import { getADiscussion } from "@/slices/discussionSlice";
import { discussionComments } from "@/slices/commentsFromDiscussion";
import PulseAnimations from "@/components/animations/PulseAnimations";

const DiscussionDetail: NextPage = () => {
  const router = useRouter();
  const { discussionId }: any = router.query;
  const [groupId, setGroupId] = useState<number | null>(null);
  const [authenticatedUser, setAuthenticatedUser] = useState<
    DecodedJWT | undefined
  >();
  const token: string | null = useMemo(() => getCookie("token"), []);
  const tokenExpiration = useMemo(
    () => (token ? parseTokenExpiration(token) : ""),
    [token]
  );
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const groups = useAppSelector((state: RootState) => state.groups);
  const discussion = useAppSelector((state: RootState) => state.getADiscussion);
  const commentsData = useAppSelector(
    (state: RootState) => state.discussionComments
  );

  const {
    handleOnMouseEnter,
    handleOnMouseLeave,
    mouseResult,
    setShowNotification,
    showNotification,
  } = Reusables();

  const handleIsLoggedOut = () => {
    setIsLoggedOut(true);
  };

  const handleLogout = () => {
    setCookie("token", "", { expires: "Thu, 01, Jan 1970 00:00:00 GMT" });
    handleIsLoggedOut();
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowNotification((prevState) => !prevState);
  };

  useEffect(() => {
    if (discussionId && groupId) {
      dispatch(discussionComments({ groupId, discussionId }));
    }
  }, [discussionId, dispatch, groupId]);

  useEffect(() => {
    if (discussion.data) {
      setGroupId(discussion.data?.group_id);
    }
  }, [discussion.data]);

  useEffect(() => {
    if (discussionId) {
      dispatch(getADiscussion(discussionId));
    }
  }, [dispatch, discussionId]);

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

  useEffect(() => {
    dispatch(allGroups());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  return (
    <div className="flex flex-col text-gray-600 antialiased">
      <Meta
        title={`${AppConfig.title} | Discussion`}
        description={AppConfig.description}
      />
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
        className="flex justify-between px-3 w-full h-24 py-6 bg-gray-800 rounded-b-lg shadow-lg"
      >
        <Logo size={44} />
        {authenticatedUser && (
          <div className="text-white text-sm bg-black rounded-lg p-2 shadow-lg">
            Welcome{" "}
            {authenticatedUser?.username.slice(0, 1).toUpperCase() +
              authenticatedUser?.username.slice(1)}
          </div>
        )}
        <div className="flex space-x-2">
          {groups.allNotifications && (
            <div
              className="flex mr-1 mt-1 cursor-pointer"
              onClick={handleClick}
            >
              <li className="bi bi-bell-fill text-white text-xl mt-1 mr-1 list-none"></li>
              <span className="flex w-4 h-4 -mt-1 p-3 -ml-2 justify-center items-center text-xs m-auto bg-red-700 rounded-full text-white">
                {groups.allNotifications.length}
              </span>
            </div>
          )}
          <Notifications
            showNotification={showNotification}
            notifications={groups.allNotifications}
            notificationStatus={groups.allNotificationsStatus}
            notificationError={groups.allNotificationsError}
          />
          <NavButton
            text="Logout"
            onClick={() => handleLogout()}
            handleOnMouseEnter={() => handleOnMouseEnter("Logout")}
            handleOnMouseLeave={handleOnMouseLeave}
            mouseResult={mouseResult}
            extrClass=""
            background="bg-blue-500"
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
        className="flex flex-col p-3 sm:w-9/12 w-5/6 min-h-screen mb-5 bg-white rounded-lg shadow-lg mx-auto mt-5"
      >
        <div className="flex flex-col space-x-3 rounded-lg bg-gray-700 px-2 py-4 shadow-lg sm:w-1/2 w-full mx-auto">
          {commentsData.commentStatus === "pending" && (
            <PulseAnimations num={12} display="grid sm:grid-cols-3 gap-4" />
          )}
          {commentsData.commentStatus === "success" && (
            <>
              <DiscussionDetailComp data={commentsData && commentsData} groupId={groupId} />
              <CommentsToDiscussion data={commentsData && commentsData} groupId={groupId}/>
            </>
          )}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default DiscussionDetail;
