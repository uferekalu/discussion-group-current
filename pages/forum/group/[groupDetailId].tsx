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

const GroupDetail: NextPage = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState<DecodedJWT>();
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);
  const router = useRouter();
  const { groupDetailId }: any = router.query;
  const dispatch = useAppDispatch();
  const token: string | null = useMemo(() => getCookie("token"), []);
  const tokenExpiration = useMemo(
    () => (token ? parseTokenExpiration(token) : ""),
    [token]
  );
  const groups = useAppSelector((state: RootState) => state.groups);
  const { buttonVariants, setHoverButton, hoverButton } = Reusables();

  const handleIsLoggedOut = () => {
    setIsLoggedOut(true);
  };

  useEffect(() => {
    dispatch(allGroups());
  }, [dispatch]);

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
        groupStatus={""}
        groupsToJoin={undefined}
        openModal={function (): void | undefined {
          throw new Error("Function not implemented.");
        }}
        selectGroup={function (id: number, name: string): void {
          throw new Error("Function not implemented.");
        }}
        handleGroupsUserBelongsTo={function (): void {
          throw new Error("Function not implemented.");
        }}
        handleJoinAGroup={function (): void {
          throw new Error("Function not implemented.");
        }}
        isJoinAGroup={false}
        isBelongTo={false}
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
                      onClick={() => {}}
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
                      onClick={() => {}}
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
    </div>
  );
};

export default GroupDetail;
