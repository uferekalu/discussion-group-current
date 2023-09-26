import { NextPage } from "next";
import React, { ReactNode, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { Meta } from "@/components/layout/Meta";
import { AppConfig } from "@/utils/AppConfig";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { motion } from "framer-motion";
import { DecodedJWT } from "@/utils/interface";
import { getUserDetails } from "@/slices/userSlice";
import { getCookie, parseTokenExpiration, setCookie } from "@/utils/utility";
import jwtDecode from "jwt-decode";
import Navigation from "@/components/navigation/Navigation";
import { Section } from "@/components/layout/Section";
import { RootState } from "@/store";
import PulseAnimations from "@/components/animations/PulseAnimations";
import UserDetailComp from "@/components/user/UserDetailComp";
import { Footer } from "@/components/footer";

const UserDetail: NextPage = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState<DecodedJWT>();
  const token: string | null = useMemo(() => getCookie("token"), []);
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);
  const tokenExpiration = useMemo(
    () => (token ? parseTokenExpiration(token) : ""),
    [token]
  );
  const userDetail = useAppSelector((state: RootState) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userDetailId }: any = router.query;

  const handleIsLoggedOut = () => {
    setIsLoggedOut(true);
  };

  useEffect(() => {
    if (userDetailId) {
      dispatch(getUserDetails(userDetailId));
    }
  }, [dispatch, userDetailId]);

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
        otherClassName="flex flex-col mt-10 sm:p-0 py-6 px-4"
        background='url("/background.jpg")'
      >
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
          className="flex flex-col sm:w-3/4 w-full min-h-screen py-2 sm:mt-0 mt-5 space-y-3 mb-5 justify-center mx-auto rounded-lg"
        >
          <motion.h1
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
            className="text-white text-sm font-bold shadow-lg w-52 text-center mx-auto p-2 rounded-lg sm:mt-20"
          >
            Your Profile
          </motion.h1>
          <motion.p
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
            className="text-white text-sm font-bold shadow-lg w-52 text-center mx-auto p-2 rounded-lg sm:mt-20 mt-3"
          >
            You can update your profile here
          </motion.p>
          {userDetail && userDetail.userStatus === "pending" && (
            <PulseAnimations num={12} display="grid sm:grid-cols-3 gap-4" />
          )}
          {userDetail && userDetail.userStatus === "success" && (
            <UserDetailComp
              userDetail={userDetail.userDetails}
              user={authenticatedUser}
              userDetailId={userDetailId}
              userUpdateMessage={userDetail.userUpdateMessage}
            />
          )}
        </motion.div>
      </Section>
      <Footer />
    </div>
  );
};

export default UserDetail;
